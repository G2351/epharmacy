"use strict";

const express = require("express");
const router = express.Router();

router.use("/v1/api/auth", require("./auth"));
router.use("/v1/api", require("./medicine"));
router.use("/v1/api", require("./user"));
router.use("/v1/api", require("./article"));
router.use("/v1/api", require("./order"));
router.use("/v1/api/upload", require("./upload"));
router.use("/v1/api", require("./category-medicine"));
router.use("/v1/api", require("./map"));
router.use("/v1/api", require("./voucher"));
router.use("/v1/api", require("./branch"));
router.use("/payments", require("./payment"));

module.exports = router;