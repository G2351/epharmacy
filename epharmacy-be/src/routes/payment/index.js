"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const PaymentController = require("../../controllers/payment.controller");
const router = express.Router();

router.post("/intents", asyncHandler(PaymentController.handlePaymentCarts));
module.exports = router;
