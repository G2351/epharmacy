"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Order.hasMany(models.Cart, { foreignKey: "order_id", as: "items" });
    }
  }
  Order.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      order_code: { type: DataTypes.STRING, allowNull: false, unique: true },
      user_id: DataTypes.INTEGER,
      recipient_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      note: DataTypes.TEXT,
      voucher_code: DataTypes.STRING,
      discount_amount: { type: DataTypes.FLOAT, defaultValue: 0 },
      shipping_fee: { type: DataTypes.FLOAT, defaultValue: 20000 },
      total_amount: DataTypes.FLOAT,
      status: {
        type: DataTypes.ENUM("pending", "processing", "done", "cancelled"),
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Order;
};