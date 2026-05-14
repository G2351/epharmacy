const { SuccessResponse, CREATED } = require("../core/success.response.js");
const OrderService = require("../services/order.service.js");

class OrderController {
  static getAllOrders = async (req, res) => {
    new SuccessResponse({
      message: "Get all orders Success!",
      data: await OrderService.getAllOrders(req.query),
    }).send(res);
  };

  static createOrder = async (req, res) => {
    new CREATED({
      message: "Create order OK!",
      data: await OrderService.createOrder(req.body),
    }).send(res);
  };

  static deleteOrder = async (req, res) => {
    new SuccessResponse({
      message: "Delete order Success!",
      data: await OrderService.deleteOrder(req.params),
    }).send(res);
  };

  static updateOrder = async (req, res) => {
    new SuccessResponse({
      message: "Update order Success!",
      data: await OrderService.updateOrder(req.body),
    }).send(res);
  };

  static deleteAllOrder = async (req, res) => {
    new SuccessResponse({
      message: "Delete all order Success!",
      data: await OrderService.deleteAllOrder(req.body),
    }).send(res);
  };

  static updateAllOrder = async (req, res) => {
    new SuccessResponse({
      message: "Update all order Success!",
      data: await OrderService.updateAllOrder(req.body),
    }).send(res);
  };

  static checkExistingMedicineWithUser = async (req, res) => {
    new SuccessResponse({
      message: "Check existing medicine Success!",
      data: await OrderService.checkExistingMedicine(req.query),
    }).send(res);
  };

  static getStatistics = async (req, res) => {
    new SuccessResponse({
      message: "Get statistics success!",
      data: await OrderService.getStatistics(),
    }).send(res);
  };
}

module.exports = OrderController;