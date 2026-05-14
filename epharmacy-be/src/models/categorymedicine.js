"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoryMedicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CategoryMedicine.hasMany(models.Medicine, {
        foreignKey: "category_medicine_id",
        as: "medicines",
      });
    }
  }
  CategoryMedicine.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "medicine_category",
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "CategoryMedicine",
    }
  );
  return CategoryMedicine;
};
