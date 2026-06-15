const { User } = require("../models/index");

class UserService {
  static getAllUsers = async ({ page, limit }) => {
    const options = {
      order: [["created_at", "desc"]],
      attributes: { exclude: ["password"] },
    };
    if (!+page || page < 0) page = 1;
    if (limit && Number.isInteger(+limit)) {
      options.limit = +limit;
      options.offset = (page - 1) * +limit;
    }
    const { rows: users, count } = await User.findAndCountAll(options);
    return { users, count };
  };

  static getUserDetail = async ({ id }) => {
    const user = await User.findByPk(id, { attributes: { exclude: ["password"] } });
    if (!user) throw new Error("User not found!");
    return user;
  };

  static updateUser = async ({ id, payload }) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found!");
    await User.update(payload, { where: { id } });
  };

  static deleteUser = async ({ id }) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found!");
    return await User.destroy({ where: { id } });
  };
}

module.exports = UserService;