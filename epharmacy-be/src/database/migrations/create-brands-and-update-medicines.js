"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tạo bảng brands nếu chưa có
    const tables = await queryInterface.showAllTables();

    if (!tables.includes("brands")) {
      await queryInterface.createTable("brands", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      });
    }

    // Thêm từng cột vào medicines nếu chưa có
    const medicineColumns = await queryInterface.describeTable("medicines");

    if (!medicineColumns.brand_id) {
      await queryInterface.addColumn("medicines", "brand_id", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "brands", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
    if (!medicineColumns.stock) {
      await queryInterface.addColumn("medicines", "stock", {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      });
    }
    if (!medicineColumns.packaging) {
      await queryInterface.addColumn("medicines", "packaging", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (!medicineColumns.indications) {
      await queryInterface.addColumn("medicines", "indications", {
        type: Sequelize.TEXT,
        allowNull: true,
      });
    }
    if (!medicineColumns.contraindications) {
      await queryInterface.addColumn("medicines", "contraindications", {
        type: Sequelize.TEXT,
        allowNull: true,
      });
    }

    // Thêm order_id vào carts nếu chưa có
    const cartColumns = await queryInterface.describeTable("carts");
    if (!cartColumns.order_id) {
      await queryInterface.addColumn("carts", "order_id", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "orders", key: "id" },
        onDelete: "SET NULL",
      });
    }
  },

  down: async (queryInterface) => {
    const cartColumns = await queryInterface.describeTable("carts");
    if (cartColumns.order_id) {
      await queryInterface.removeColumn("carts", "order_id");
    }

    const medicineColumns = await queryInterface.describeTable("medicines");
    for (const col of ["brand_id", "stock", "packaging", "indications", "contraindications"]) {
      if (medicineColumns[col]) {
        await queryInterface.removeColumn("medicines", col);
      }
    }

    const tables = await queryInterface.showAllTables();
    if (tables.includes("brands")) {
      await queryInterface.dropTable("brands");
    }
  },
};