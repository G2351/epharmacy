"use strict";
const { NotFoundError, BadRequestError } = require("../core/error.response");
const { Branch } = require("../models/index");

class BranchService {
  static getAllBranches = async ({ page, limit }) => {
    const options = {
      order: [["created_at", "desc"]],
    };
    if (!Number.isInteger(+page) || +page <= 0) {
    page = 1;
    }

    if (limit && Number.isInteger(+limit) && +limit > 0) {
    options.limit = +limit;
    options.offset = (page - 1) * +limit;
    }

    const { rows: branches, count } = await Branch.findAndCountAll(options);
    return { branches, count };
  };

  static createBranch = async (payload) => {
    const { address } = payload;
    const foundBranch = await Branch.findOne({ where: { address } });
    if (foundBranch) {
      throw new BadRequestError("Branch exist!");
    }
    const branch = await Branch.create(payload);
    if (!branch) throw new BadRequestError("Create Branch error");
    return branch;
  };

  static updateBranch = async ({ id }, payload) => {
    const branch = await Branch.findByPk(id);
    if (!branch) {
      throw new NotFoundError("Branch not found!");
    }
    return await branch.update(payload);
  };

  static deleteBranch = async ({ id }) => {
    const branch = await Branch.findByPk(id);
    if (!branch) {
      throw new NotFoundError("Branch not found!");
    }
    const deleted = await Branch.destroy({ where: { id } });
    return deleted;
  };
}

module.exports = BranchService;