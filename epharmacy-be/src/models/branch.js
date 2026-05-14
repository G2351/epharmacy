"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    static associate(models) {}
  }
  Branch.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      address: DataTypes.STRING(500),
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Branch",
      tableName: "branches",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Branch;
};