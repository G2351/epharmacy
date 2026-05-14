"use strict";
const { SuccessResponse, CREATED } = require("../core/success.response.js");
const BranchService = require("../services/branch.service.js");

class BranchController {
  static getAllBranches = async (req, res) => {
    new SuccessResponse({
      message: "Get all branches Success!",
      data: await BranchService.getAllBranches(req.query),
    }).send(res);
  };

  static createBranch = async (req, res) => {
    new CREATED({
      message: "Create branch OK!",
      data: await BranchService.createBranch(req.body),
    }).send(res);
  };

  static updateBranch = async (req, res) => {
    new SuccessResponse({
      message: "Update branch Success!",
      data: await BranchService.updateBranch(req.params, req.body),
    }).send(res);
  };

  static deleteBranch = async (req, res) => {
    new SuccessResponse({
      message: "Delete branch Success!",
      data: await BranchService.deleteBranch(req.params),
    }).send(res);
  };
}

module.exports = BranchController;