"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    static associate(models) {
      Voucher.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Voucher.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      voucher_code: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      discount_amount: DataTypes.FLOAT,
      is_used: DataTypes.BOOLEAN,
      expired_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Voucher",
      tableName: "vouchers",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Voucher;
};