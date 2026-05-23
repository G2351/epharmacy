"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const OrderController = require("../../controllers/order.controller");
const router = express.Router();

router.get("/orders/statistics", asyncHandler(OrderController.getStatistics));
router.get("/orders/existing", asyncHandler(OrderController.checkExistingMedicineWithUser));
router.get("/orders", asyncHandler(OrderController.getAllOrders));
router.post("/order", asyncHandler(OrderController.createOrder));
router.patch("/order", asyncHandler(OrderController.updateOrder));
router.patch("/order/:id/status", asyncHandler(OrderController.updateOrderStatus));
router.delete("/order/:id", asyncHandler(OrderController.deleteOrder));
router.post("/order/delete", asyncHandler(OrderController.deleteAllOrder));
router.post("/order/update", asyncHandler(OrderController.updateAllOrder));
router.post("/order/checkout", asyncHandler(OrderController.createOrderFromCart));
router.get("/order/history", asyncHandler(OrderController.getOrderHistory));

module.exports = router;