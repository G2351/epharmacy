"use strict";
const { NotFoundError, BadRequestError } = require("../core/error.response");
const { Cart, User, Order, Medicine } = require("../models/index");
const { Op, fn, col, literal } = require("sequelize");

const generateOrderCode = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `EPH-${date}-${rand}`;
};

class OrderService {
  static createOrderFromCart = async (payload) => {
    const {
      user_id, cart_ids,
      recipient_name, email,
      phone, address, note,
      voucher_code, discount_amount,
      shipping_fee = 20000,
      total_amount,
    } = payload;

    if (!phone?.trim()) throw new BadRequestError("Vui lòng nhập số điện thoại!");
    if (!address?.trim()) throw new BadRequestError("Vui lòng nhập địa chỉ giao hàng!");
    if (!recipient_name?.trim()) throw new BadRequestError("Vui lòng nhập họ tên!");

    const carts = await Cart.findAll({
      where: { id: cart_ids, user_id, status: "pending" },
    });
    if (carts.length !== cart_ids.length) {
      throw new BadRequestError("Một số sản phẩm không hợp lệ!");
    }

    const order = await Order.create({
      order_code: generateOrderCode(),
      user_id,
      recipient_name,
      email,
      phone,
      address,
      note,
      voucher_code,
      discount_amount: discount_amount || 0,
      shipping_fee,
      total_amount,
      status: "pending",
    });

    await Cart.update(
      { order_id: order.id, status: "done" },
      { where: { id: cart_ids } }
    );

    return order;
  };

  static getOrderHistory = async ({ user_id, page = 1, limit = 10 }) => {
    if (!user_id) throw new BadRequestError("Thiếu user_id!");

    const options = {
      where: { user_id },
      order: [["created_at", "desc"]],
      include: [
        {
          model: Cart,
          as: "items",
          attributes: [
            "id", "product_id", "name", "image",
            "quantity", "new_price", "old_price",
          ],
        },
      ],
      limit: +limit,
      offset: (page - 1) * +limit,
      distinct: true,
    };

    const { rows: orders, count } = await Order.findAndCountAll(options);
    return { orders, count };
  };

  static getAllOrders = async ({ page, limit, userId, status }) => {
    const options = {
      order: [["created_at", "desc"]],
      where: {},
    };

    if (userId) options.where.user_id = userId;
    if (!+page || page < 0) page = 1;
    if (limit && Number.isInteger(+limit)) {
      options.limit = +limit;
      options.offset = (page - 1) * +limit;
    }
    if (status) options.where.status = status;

    if (status === "pending") {
      const { rows: orders, count } = await Cart.findAndCountAll(options);
      return { orders, count };
    }

    options.include = [
      { model: User, attributes: ["name", "email"], as: "user" },
      {
        model: Cart,
        as: "items",
        attributes: ["id", "product_id", "name", "quantity", "new_price", "image"],
      },
    ];
    const { rows: orders, count } = await Order.findAndCountAll(options);
    return { orders, count };
  };

  static createOrder = async (payload) => {
    const { user_id, product_id, quantity } = payload;

    const medicine = await Medicine.findByPk(product_id);
    if (!medicine) throw new NotFoundError("Sản phẩm không tồn tại!");

    const findCart = await Cart.findOne({
      where: { user_id, product_id, status: "pending" },
    });

    const currentQty = findCart ? +findCart.quantity : 0;
    const newQty = currentQty + quantity;

    if (newQty > medicine.stock) {
      throw new BadRequestError(`Chỉ còn ${medicine.stock} sản phẩm trong kho!`);
    }

    if (findCart) {
      return await findCart.update({ quantity: newQty });
    }
    return await Cart.create(payload);
  };

  static updateOrder = async ({ idOrder, payload }) => {
    const order = await Cart.findByPk(idOrder);
    if (!order) throw new NotFoundError("Order not found!");

    if (payload.quantity !== undefined) {
      const medicine = await Medicine.findByPk(order.product_id);
      if (medicine && Number(payload.quantity) > medicine.stock) {
        throw new BadRequestError(`Chỉ còn ${medicine.stock} sản phẩm trong kho!`);
      }
    }

    await Cart.update(payload, { where: { id: idOrder } });
  };

  static updateOrderStatus = async ({ id, status }) => {
    const order = await Order.findByPk(id);
    if (!order) throw new NotFoundError("Order not found!");
    return await order.update({ status });
  };

  static deleteOrder = async ({ id }) => {
    const order = await Cart.findByPk(id);
    if (!order) throw new NotFoundError("Order not found!");
    return await Cart.destroy({ where: { id } });
  };

  static deleteAllOrder = async ({ ids }) => {
    return await Cart.destroy({ where: { id: ids } });
  };

  static updateAllOrder = async ({ data }) => {
    return Cart.bulkCreate(data, { updateOnDuplicate: ["status"] });
  };

  static checkExistingMedicine = async ({ user_id, product_id, status }) => {
    const cart = await Cart.findOne({ where: { user_id, product_id, status } });
    return !!cart;
  };

  static getStatistics = async () => {
    const revenueFromOrders =
      (await Order.sum("total_amount", { where: { status: "done" } })) || 0;

    const revenueFromCartsResult = await Cart.findOne({
      attributes: [[fn("SUM", literal("new_price * quantity")), "total"]],
      where: { status: "done" },
      raw: true,
    });
    const revenueFromCarts = Number(revenueFromCartsResult?.total) || 0;

    const totalRevenue = revenueFromOrders + revenueFromCarts;

    const revenueByMonth = await Order.findAll({
      attributes: [
        [literal("DATE_TRUNC('month', created_at)"), "month"],
        [fn("SUM", col("total_amount")), "revenue"],
        [fn("COUNT", col("id")), "orders"],
      ],
      where: {
        status: "done",
        created_at: {
          [Op.gte]: new Date(
            new Date().setFullYear(new Date().getFullYear() - 1)
          ),
        },
      },
      group: [literal("DATE_TRUNC('month', created_at)")],
      order: [[literal("DATE_TRUNC('month', created_at)"), "ASC"]],
      raw: true,
    });

    const soldProducts = await Cart.findAll({
      attributes: [
        "product_id",
        "name",
        "image",
        [fn("SUM", col("quantity")), "totalSold"],
        [fn("SUM", literal("new_price * quantity")), "totalRevenue"],
      ],
      where: { status: "done" },
      group: ["product_id", "name", "image"],
      order: [[fn("SUM", col("quantity")), "DESC"]],
      raw: true,
    });

    const ordersByStatus = await Order.findAll({
      attributes: ["status", [fn("COUNT", col("id")), "count"]],
      group: ["status"],
      raw: true,
    });

    const totalOrders = ordersByStatus.reduce((sum, s) => sum + Number(s.count), 0);
    const totalSoldItems = soldProducts.reduce((sum, p) => sum + Number(p.totalSold), 0);

    return { totalRevenue, totalOrders, totalSoldItems, revenueByMonth, soldProducts, ordersByStatus };
  };
}

module.exports = OrderService;