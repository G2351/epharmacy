"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const MedicineController = require("../../controllers/medicine.controller");
const router = express.Router();

router.get("/medicines", asyncHandler(MedicineController.getAllMedicines));
router.get(
  "/medicines/:id",
  asyncHandler(MedicineController.getMedicineDetail)
);
router.patch("/medicines/:id", asyncHandler(MedicineController.updateMedicine));
router.post("/medicine", asyncHandler(MedicineController.createMedicine));
router.delete(
  "/medicines/:id",
  asyncHandler(MedicineController.deleteMedicine)
);

module.exports = router;
