const { Op, literal } = require("sequelize");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const { Medicine, CategoryMedicine, Brand } = require("../models/index");

class MedicineService {
  static getAllMedicines = async ({ page, limit, categoryId, brandId, q, sortBy }) => {
    const options = {
      include: [
        { model: CategoryMedicine, as: "categoryMedicine", attributes: ["id", "name"] },
        { model: Brand, as: "brand", attributes: ["id", "name"] },
      ],
    };

    if (!+page || page < 0) page = 1;
    if (limit && Number.isInteger(+limit)) {
      options.limit = +limit;
      options.offset = (page - 1) * +limit;
    }

    options.where = {};
    if (categoryId) options.where.category_medicine_id = +categoryId;
    if (brandId) options.where.brand_id = +brandId;
    if (q) options.where.name = { [Op.iLike]: `%${q}%` };

    if (sortBy === "price_asc") {
      options.order = [["new_price", "ASC"]];
    } else if (sortBy === "price_desc") {
      options.order = [["new_price", "DESC"]];
    } else if (sortBy === "best_seller") {
      options.attributes = {
        include: [
          [
            literal(`(
              SELECT COALESCE(SUM(c.quantity), 0)
              FROM carts c
              WHERE c.product_id = "Medicine"."id"
              AND c.status = 'done'
            )`),
            "totalSold",
          ],
        ],
      };
      options.order = [[literal('"totalSold"'), "DESC"]];
    } else {
      options.order = [["created_at", "DESC"]];
    }

    const { rows: medicines, count } = await Medicine.findAndCountAll(options);
    return { medicines, count };
  };

  static deleteMedicine = async ({ id }) => {
    const medicine = await Medicine.findByPk(id);
    if (!medicine) throw new NotFoundError("Medicine not found!");
    return await Medicine.destroy({ where: { id } });
  };

  static updateMedicine = async (id, payload) => {
    const medicine = await Medicine.findByPk(id.id);
    if (!medicine) throw new NotFoundError("Medicine not found!");

    const allowedFields = [
      "name", "old_price", "new_price", "description", "image", "rate",
      "category_medicine_id", "brand_id", "stock", "packaging",
      "indications", "contraindications",
    ];
    const filtered = Object.fromEntries(
      Object.entries(payload).filter(([k]) => allowedFields.includes(k))
    );

    if (payload.brand_name?.trim()) {
      const [brand] = await Brand.findOrCreate({
        where: { name: payload.brand_name.trim() },
        defaults: { name: payload.brand_name.trim() },
      });
      filtered.brand_id = brand.id;
    }

    if (filtered.stock !== undefined) filtered.stock = Number(filtered.stock);
    if (filtered.old_price !== undefined) filtered.old_price = Number(filtered.old_price);
    if (filtered.new_price !== undefined) filtered.new_price = Number(filtered.new_price);

    await Medicine.update(filtered, { where: { id: id.id } });
  };

  static getMedicineDetail = async ({ id }) => {
    const medicine = await Medicine.findByPk(id, {
      include: [
        { model: CategoryMedicine, as: "categoryMedicine", attributes: ["id", "name"]},
        { model: Brand, as: "brand", attributes: ["id", "name"] },
      ],
    });
    if (!medicine) throw new NotFoundError("Medicine không tồn tại!");
    return medicine;
  };

  static createMedicine = async (payload) => {
    const allowedFields = [
      "name", "old_price", "new_price", "description", "image", "rate",
      "category_medicine_id", "brand_id", "stock", "packaging",
      "indications", "contraindications",
    ];
    const filtered = Object.fromEntries(
      Object.entries(payload).filter(([k]) => allowedFields.includes(k))
    );

    if (payload.brand_name?.trim()) {
      const [brand] = await Brand.findOrCreate({
        where: { name: payload.brand_name.trim() },
        defaults: { name: payload.brand_name.trim() },
      });
      filtered.brand_id = brand.id;
    }

    if (filtered.stock !== undefined) filtered.stock = Number(filtered.stock);
    if (filtered.old_price !== undefined) filtered.old_price = Number(filtered.old_price);
    if (filtered.new_price !== undefined) filtered.new_price = Number(filtered.new_price);

    const medicine = await Medicine.create(filtered);
    if (!medicine) throw new BadRequestError("Create medicine error");
    return medicine;
  };
}

module.exports = MedicineService;