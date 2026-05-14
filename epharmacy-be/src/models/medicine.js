"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medicine.belongsTo(models.CategoryMedicine, {
        foreignKey: "category_medicine_id",
        as: "categoryMedicine",
      });
    }
  }
  Medicine.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_medicine_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      old_price: DataTypes.FLOAT,
      new_price: DataTypes.FLOAT,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      rate: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Medicine",
      tableName: "medicines",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Medicine;
};
