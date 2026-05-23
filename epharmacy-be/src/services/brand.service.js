const { NotFoundError, BadRequestError } = require("../core/error.response");
const { Brand } = require("../models/index");

class BrandService {
  static getAllBrands = async ({ page = 1, limit = 100 }) => {
    const options = {
      order: [["name", "asc"]],
    };
    if (limit && Number.isInteger(+limit)) {
      options.limit = +limit;
      options.offset = (page - 1) * +limit;
    }
    const { rows: brands, count } = await Brand.findAndCountAll(options);
    return { brands, count };
  };

  static createBrand = async ({ name }) => {
    const existed = await Brand.findOne({ where: { name } });
    if (existed) throw new BadRequestError("Thương hiệu đã tồn tại!");
    const brand = await Brand.create({ name });
    if (!brand) throw new BadRequestError("Tạo thương hiệu thất bại!");
    return brand;
  };

  static updateBrand = async ({ id }, { name }) => {
    const brand = await Brand.findByPk(id);
    if (!brand) throw new NotFoundError("Thương hiệu không tồn tại!");
    await Brand.update({ name }, { where: { id } });
  };

  static deleteBrand = async ({ id }) => {
    const brand = await Brand.findByPk(id);
    if (!brand) throw new NotFoundError("Thương hiệu không tồn tại!");
    return await Brand.destroy({ where: { id } });
  };
}

module.exports = BrandService;