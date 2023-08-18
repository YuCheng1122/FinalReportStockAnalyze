"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Industry_EPS", {
      industry_eps_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      stock_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Stock",
          key: "stock_id",
        },
        allowNull: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      quarter: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      v_p: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      b_p: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      revenue: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      profit: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      income_expenses: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      profit_after_price: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      create_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      update_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Industry_EPS");
  },
};
