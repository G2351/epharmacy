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
router.delete("/order/:id", asyncHandler(OrderController.deleteOrder));
router.post("/order/delete", asyncHandler(OrderController.deleteAllOrder));
router.post("/order/update", asyncHandler(OrderController.updateAllOrder));

module.exports = router;