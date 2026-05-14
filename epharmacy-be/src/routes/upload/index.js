"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const upload = require("../../middleware/multer");
const UploadController = require("../../controllers/upload.controller");
const router = express.Router();

router.post(
  "/image",
  upload.single("image"),
  UploadController.handleUploadImage
);

module.exports = router;