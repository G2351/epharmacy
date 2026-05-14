"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const BranchController = require("../../controllers/branch.controller");
const router = express.Router();

router.get("/branches", asyncHandler(BranchController.getAllBranches));
router.post("/branch", asyncHandler(BranchController.createBranch));
router.put("/branch/:id", asyncHandler(BranchController.updateBranch));
router.delete("/branch/:id", asyncHandler(BranchController.deleteBranch));

module.exports = router;