"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const VoucherController = require("../../controllers/voucher.controller");
const router = express.Router();

router.get("/voucher", asyncHandler(VoucherController.getAllVouchers));
router.get("/voucher/all", asyncHandler(VoucherController.findAllVouchers));
router.get("/voucher/:id", asyncHandler(VoucherController.getVoucherDetail));
router.post(
  "/getVoucherByCode",
  asyncHandler(VoucherController.getVoucherByCode)
);
router.post("/voucher", asyncHandler(VoucherController.createVoucher));
router.patch("/voucher/:id", asyncHandler(VoucherController.updateVoucher));
router.delete("/voucher/:id", asyncHandler(VoucherController.deleteVoucher));

module.exports = router;
