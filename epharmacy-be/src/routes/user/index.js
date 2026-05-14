"use strict"
const express = require("express")
const asyncHandler = require("../../helpers/asyncHandler")
const UserController = require("../../controllers/user.controller")
const router = express.Router()

router.get("/users", asyncHandler(UserController.getAllUsers))
router.get("/users/:id", asyncHandler(UserController.getUserDetail))

module.exports = router