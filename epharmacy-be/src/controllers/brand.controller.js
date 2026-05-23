const { SuccessResponse, CREATED } = require("../core/success.response.js");
const BrandService = require("../services/brand.service.js");

class BrandController {
  static getAllBrands = async (req, res) => {
    new SuccessResponse({
      message: "Get all brands success!",
      data: await BrandService.getAllBrands(req.query),
    }).send(res);
  };

  static createBrand = async (req, res) => {
    new CREATED({
      message: "Create brand success!",
      data: await BrandService.createBrand(req.body),
    }).send(res);
  };

  static updateBrand = async (req, res) => {
    new SuccessResponse({
      message: "Update brand success!",
      data: await BrandService.updateBrand(req.params, req.body),
    }).send(res);
  };

  static deleteBrand = async (req, res) => {
    new SuccessResponse({
      message: "Delete brand success!",
      data: await BrandService.deleteBrand(req.params),
    }).send(res);
  };
}

module.exports = BrandController;