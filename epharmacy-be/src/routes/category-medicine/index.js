"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const {
  getAllCategoryMedicine,
  createCategoryMedicine,
  updateCategoryMedicine,
  deleteCategoryMedicine,
} = require("../../controllers/category-medicine.controller");
const router = express.Router();

router.get("/category-medicine", asyncHandler(getAllCategoryMedicine));
router.patch("/category-medicine/:id", asyncHandler(updateCategoryMedicine));
router.delete("/category-medicine/:id", asyncHandler(deleteCategoryMedicine));
router.post("/category-medicine", asyncHandler(createCategoryMedicine));

module.exports = router;
