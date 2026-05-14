const { Op } = require("sequelize");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const { Medicine, CategoryMedicine } = require("../models/index");
class MedicineService {
  static getAllMedicines = async ({ page, limit, categoryId, q }) => {
    const options = {
      order: [["created_at", "desc"]],
      include: [
        {
          model: CategoryMedicine,
          as: "categoryMedicine",
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
    }
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
    const {
      name,
      old_price,
      new_price,
      description,
      image,
      rate,
      category_medicine_id,
    } = payload;
    const medicine = await Medicine.create(payload);
    if (!medicine) throw new BadRequestError("Create medicine error");
    return medicine;
  };
 
}

module.exports = MedicineService;
