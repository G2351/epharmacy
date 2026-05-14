const { SuccessResponse, CREATED } = require("../core/success.response.js");
const bcrypt = require("bcrypt");
const AuthService = require("../services/auth.service.js");
const UserTransformer = require("../transformers/user.transformer.js");

class AuthController {
  static login = async (req, res) => {
    const { email, password } = req.body;
    const obj = {
      status: 200,
      message: "Success!",
    };
    const findUser = await AuthService.findUser(email);
    if (!findUser) {
      (obj.status = 403), (obj.message = "Not found user!");
    } else {
      const match = await bcrypt.compare(password, findUser.password);
      if (!match) {
        (obj.status = 401), (obj.message = "UnAuthorization!");
      } else {
        const userTransformer = new UserTransformer(findUser);
        obj.data = userTransformer;
      }
    }
    res.status(obj.status).send(obj);
  };
  static signup = async (req, res) => {
    const { name, email, password } = req.body;
    const obj = {
      status: 201,
      message: "Success!",
    };
    const findUser = await AuthService.findUser(email);
    if (findUser) {
      (obj.status = 403), (obj.message = "Account already registered!");
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await AuthService.createUser({
        name,
        email,
        password: passwordHash,
        status: "active",
      });
      obj.data = user;
    }
    res.status(obj.status).send(obj);
  };
  static logout = async (req, res) => {
    new SuccessResponse({
      message: "Logout Success!",
      data: await AuthService.logout(req.body),
    }).send(res);
  };

  static handleChangeInfo = async (req, res) => {
    new SuccessResponse({
      message: "Change Info Success!",
      data: await AuthService.handleChangeInfo(req.body),
    }).send(res);
  };
}

module.exports = AuthController;
