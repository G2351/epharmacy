const { SuccessResponse, CREATED } = require("../core/success.response.js");
const VoucherService = require("../services/voucher.service.js");
class VoucherController {
  static getAllVouchers = async (req, res) => {
    new SuccessResponse({
      message: "Get all vouchers Success!",
      data: await VoucherService.getAllVouchers(req.query),
    }).send(res);
  };

  static findAllVouchers = async (req, res) => {
    new SuccessResponse({
      message: "Find all vouchers Success!",
      data: await VoucherService.findAllVouchers(req.query),
    }).send(res);
  };

  static deleteVoucher = async (req, res) => {
    new SuccessResponse({
      message: "Delete vouchers Success!",
      data: await VoucherService.deleteVoucher(req.params),
    }).send(res);
  };

  static getVoucherDetail = async (req, res) => {
    new SuccessResponse({
      message: "Get voucher detail Success!",
      data: await VoucherService.getVoucherDetail(req.params),
    }).send(res);
  };

  static updateVoucher = async (req, res) => {
    new SuccessResponse({
      message: "Update voucher Success!",
      data: await VoucherService.updateVoucher(req.params, req.body),
    }).send(res);
  };

  static createVoucher = async (req, res) => {
    new CREATED({
      message: "Create voucher OK!",
      data: await VoucherService.createVoucher(req.body),
    }).send(res);
  };

  static getVoucherByCode = async (req, res) => {
    new CREATED({
      message: "GetVoucherByCode OK!",
      data: await VoucherService.getVoucherByCode(req.body),
    }).send(res);
  };
}

module.exports = VoucherController;
