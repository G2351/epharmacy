"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      Brand.hasMany(models.Medicine, {
        foreignKey: "brand_id",
        as: "medicines",
      });
    }
  }
  Brand.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Brand",
      tableName: "brands",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Brand;
};