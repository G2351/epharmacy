const { NotFoundError } = require("../core/error.response");
const { Cart, User } = require("../models/index");
const { Op, fn, col, literal } = require("sequelize");

class CartService {
  static getAllOrders = async ({ page, limit, userId, status }) => {
    const options = {
      order: [["created_at", "desc"]],
      include: [
        {
          model: User,
          attributes: ["name", "email", "status"],
          as: "user",
        },
      ],
    };
    options.where = {};
    if (userId) options.where.user_id = userId;
    if (!+page || page < 0) page = 1;
    if (limit && Number.isInteger(+limit)) {
      options.limit = limit;
      options.offset = (page - 1) * limit;
    }
    if (status) options.where.status = status;
    console.log("options", options);
    const { rows: carts, count } = await Cart.findAndCountAll(options);
    return { carts, count };
  };

  static createOrder = async (payload) => {
    const { user_id, product_id, quantity } = payload;
    console.log("userId", user_id);
    const findCart = await Cart.findOne({
      where: { user_id, product_id, status: "pending" },
    });
    let cart;
    if (findCart) {
      cart = await findCart.update({ quantity: +findCart.quantity + quantity });
    } else {
      cart = await Cart.create(payload);
    }
    return cart;
  };

  static updateOrder = async ({ idOrder, payload }) => {
    const order = await Cart.findByPk(idOrder);
    if (!order) throw new NotFoundError("Order not found!");
    await Cart.update(payload, { where: { id: idOrder } });
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
    const totalRevenue = await Cart.sum("new_price", {
      where: { status: "done" },
    }) || 0;

    const revenueByMonth = await Cart.findAll({
      attributes: [
        [fn("DATE_TRUNC", "month", col("created_at")), "month"],
        [fn("SUM", col("new_price")), "revenue"],
        [fn("COUNT", col("id")), "orders"],
      ],
      where: {
        status: "done",
        created_at: {
          [Op.gte]: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
      },
      group: [fn("DATE_TRUNC", "month", col("created_at"))],
      order: [[fn("DATE_TRUNC", "month", col("created_at")), "ASC"]],
      raw: true,
    });

    const topMedicines = await Cart.findAll({
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
      limit: 5,
      raw: true,
    });

    const ordersByStatus = await Cart.findAll({
      attributes: ["status", [fn("COUNT", col("id")), "count"]],
      group: ["status"],
      raw: true,
    });

    return { totalRevenue, revenueByMonth, topMedicines, ordersByStatus };
  };
}

module.exports = CartService;