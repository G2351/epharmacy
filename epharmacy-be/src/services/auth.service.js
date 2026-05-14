const { BadRequestError, AuthFailureError } = require("../core/error.response");
const UserTransformer = require("../transformers/user.transformer");
const bcrypt = require("bcrypt");
const { User } = require("../models/index");

class AuthService {
  static findUser = async (email) => {
    return await User.findOne({
      where: { email },
    });
  };

  static handleChangeInfo = async (data) => {
    const foundUser = await User.findByPk(data.idUser);
    if (!foundUser) throw new BadRequestError("Not found User!");
    const objectUpdate = {};
    if (data?.name) {
      objectUpdate.name = data.name;
    }
    if (data?.password && data?.oldPassword) {
      const match = await bcrypt.compare(data.oldPassword, foundUser.password);
      if (!match) throw new AuthFailureError("Authentication Error");
      const hashPassword = bcrypt.hashSync(data.password, 10);
      objectUpdate.password = hashPassword;
    }
    await foundUser.update(objectUpdate);
  };

  static createUser = async (payload) => {
    const newUser = await User.create(payload);
    const userTransformer = new UserTransformer(newUser);
    return userTransformer;
  };

  static logout = async () => {};
}

module.exports = AuthService;
