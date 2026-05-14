const { BadRequestError } = require("../core/error.response");
const { CategoryMedicine } = require("../models/index");
class CategoryMedicineService {
  static getAllCategoryMedicine = async ({ page, limit }) => {
    const options = {
      order: [["created_at", "desc"]],
    };
    if (!+page || page < 0) {
      page = 1;
    }

    if (limit && Number.isInteger(+limit)) {
      options.limit = limit;
      const offset = (page - 1) * limit;
      options.offset = offset;
    }

    const { rows: categoryMedicine, count } =
      await CategoryMedicine.findAndCountAll(options);
    return {
      categoryMedicine,
      count,
    };
  };

  static createCategoryMedicine = async (payload) => {
    const { name } = payload;
    const categoryMedicine = await CategoryMedicine.findOne({
      where: { name },
    });
    if (categoryMedicine) {
      throw new BadRequestError("Category exist!");
    }
    const category = await CategoryMedicine.create(payload);
    if (!category) throw new BadRequestError("Create Category error");
    return category;
  };

  static updateCategoryMedicine = async ({ id }, payload) => {
    const categoryMedicine = await CategoryMedicine.findByPk(id);
    if (!categoryMedicine) {
      throw new NotFoundError("categoryMedicine not found!");
    }
    await doctorGroup.update(payload, {
      where: {
        id,
      },
    });
  };

  static deleteCategoryMedicine = async ({ id }) => {
    const categoryMedicine = await CategoryMedicine.findByPk(id);
    if (!categoryMedicine) {
      throw new NotFoundError("CategoryMedicine not found!");
    }
    const deleted = await categoryMedicine.destroy({
      where: {
        id,
      },
    });
    return deleted;
  };
}

module.exports = CategoryMedicineService;
