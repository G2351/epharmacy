"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("orders", "payment_method", {
      type: Sequelize.ENUM("stripe", "cod"),
      defaultValue: "stripe",
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("orders", "payment_method");
  },
};