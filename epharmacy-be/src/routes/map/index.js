"use strict";
const express = require("express");
const router = express.Router();
const mapController = require("../../controllers/map.controller");
router.get("/near-places", mapController.getNearPlaces);
module.exports = router;
