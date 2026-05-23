"use strict";
const express = require("express");
const router = express.Router();
const BrandController = require("../../controllers/brand.controller");

router.get("/brands", BrandController.getAllBrands);
router.post("/brands", BrandController.createBrand);
router.patch("/brands/:id", BrandController.updateBrand);
router.delete("/brands/:id", BrandController.deleteBrand);

module.exports = router;