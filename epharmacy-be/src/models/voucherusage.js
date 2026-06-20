"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VoucherUsage extends Model {
    static associate(models) {
      VoucherUsage.belongsTo(models.Voucher, { foreignKey: "voucher_id" });
      VoucherUsage.belongsTo(models.User, { foreignKey: "user_id" });
      VoucherUsage.belongsTo(models.Order, { foreignKey: "order_id" });
    }
  }
  VoucherUsage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      voucher_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "VoucherUsage",
      tableName: "voucher_usages",
      createdAt: "created_at",
      updatedAt: false,
    }
  );
  return VoucherUsage;
};