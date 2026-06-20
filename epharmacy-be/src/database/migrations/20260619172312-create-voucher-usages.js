"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("voucher_usages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      voucher_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
      },

      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("voucher_usages");
  },
};