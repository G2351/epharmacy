const { SuccessResponse } = require("../core/success.response.js");
const UserService = require("../services/user.service");

class UserController {
  static getAllUsers = async (req, res) => {
    new SuccessResponse({
      message: "Get all users Success!",
      data: await UserService.getAllUsers(req.query),
    }).send(res);
  };

  static getUserDetail = async (req, res) => {
    new SuccessResponse({
      message: "Get user detail Success!",
      data: await UserService.getUserDetail({ id: req.params.id }),
    }).send(res);
  };

  static updateUser = async (req, res) => {
    new SuccessResponse({
      message: "Update user Success!",
      data: await UserService.updateUser({ id: req.params.id, payload: req.body }),
    }).send(res);
  };

  static deleteUser = async (req, res) => {
    new SuccessResponse({
      message: "Delete user Success!",
      data: await UserService.deleteUser({ id: req.params.id }),
    }).send(res);
  };
}

module.exports = UserController;