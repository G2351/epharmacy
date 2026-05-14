"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("vouchers", "discount_amount", {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn("vouchers", "discount_amount");
  },
};