"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "phone", {
      type: Sequelize.STRING(20),
      allowNull: true,
    });
    await queryInterface.addColumn("users", "address", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn("users", "phone");
    await queryInterface.removeColumn("users", "address");
  },
};