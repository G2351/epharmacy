const { Op, where } = require("sequelize");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const { Medicine, CategoryMedicine, Brand } = require("../models/index");
class MedicineService {
  static getAllMedicines = async ({ page, limit, categoryId, brandId, q }) => {
    const options = {
      order: [["created_at", "desc"]],
      include: [
        {
          model: CategoryMedicine,
          as: "categoryMedicine",
          attributes: ["id", "name"],
        },
        { model: Brand,
          as: "brand",
          attributes: ["id", "name"],
        },
      ],
    };
    if (!+page || page < 0) {
      page = 1;
    }

    if (limit && Number.isInteger(+limit)) {
      options.limit = limit;
      const offset = (page - 1) * limit;
      options.offset = offset;
    }

    options.where = {};
    if (categoryId) {
      options.where.category_medicine_id = +categoryId;
    }
    if (brandId) {
      options.where.brand_id = +brandId
    };
    if (q) {
      options.where.name = { [Op.iLike]: `%${q}%` };
    }

    const { rows: medicines, count } = await Medicine.findAndCountAll(options);
    return {
      medicines,
      count,
    };
  };

  static deleteMedicine = async ({ id }) => {
    const medicine = await Medicine.findByPk(id);
    if (!medicine) {
      throw new NotFoundError("Medicine not found!");
    
    };
    const deleted = await Medicine.destroy({
      where: {
        id,
      },
    });
    return deleted;
  };
  static updateMedicine = async (id, payload) => {
    const medicine = await Medicine.findByPk(id.id);
    if (!medicine) {
      throw new NotFoundError("Medicine not found!");
    
    const allowedFields = [
      "name", "old_price", "new_price", "description", "image", "rate",
      "category_medicine_id", "brand_id", "stock", "packaging",
      "indications", "contraindications",
    ];
    const filtered = Object.fromEntries(
      Object.entries(payload).filter(([k]) => allowedFields.includes(k))
    );
    if (filtered.stock !== undefined) filtered.stock = Number(filtered.stock);
    if (filtered.old_price !== undefined) filtered.old_price = Number(filtered.old_price);
    if (filtered.new_price !== undefined) filtered.new_price = Number(filtered.new_price);

    }
    await Medicine.update(payload, {
      where: {
        id: id.id,
      },
    });
  };
  static getMedicineDetail = async ({ id }) => {
    const medicine = await Medicine.findByPk(id);
    if (!medicine) {
      throw new NotFoundError("Medicine không tồn tại!");
    }
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
    const medicine = await Medicine.create(filtered);
    if (!medicine) throw new BadRequestError("Create medicine error");
    return medicine;
  };
 
}

module.exports = MedicineService;
