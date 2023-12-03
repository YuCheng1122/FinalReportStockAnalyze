'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('incomeStatements', {
      incomeStatements_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      stock_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'stock',
          key: 'stock_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      revenue: {
        type: Sequelize.STRING,
        allowNull: true
      },
      grossProfit: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingExpenses: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sellingExpenses: {
        type: Sequelize.STRING,
        allowNull: true
      },
      administrativeExpenses: {
        type: Sequelize.STRING,
        allowNull: true
      },
      researchAndDevelopmentExpenses: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingIncome: {
        type: Sequelize.STRING,
        allowNull: true
      },
      profitBeforeTax: {
        type: Sequelize.STRING,
        allowNull: true
      },
      netIncome: {
        type: Sequelize.STRING,
        allowNull: true
      },
      netIncomeAttributableToOwnersOfTheParent: {
        type: Sequelize.STRING,
        allowNull: true
      },
      eps: {
        type: Sequelize.STRING,
        allowNull: true
      },
      epsQOQ: {
        type: Sequelize.STRING,
        allowNull: true
      },
      epsYOY: {
        type: Sequelize.STRING,
        allowNull: true
      },
      epsT4Q: {
        type: Sequelize.STRING,
        allowNull: true
      },
      epsT4QAvg: {
        type: Sequelize.STRING,
        allowNull: true
      },
      epsT4QQOQ: {
        type: Sequelize.STRING,
        allowNull: true
      },
      epsT4QYOY: {
        type: Sequelize.STRING,
        allowNull: true
      },
      grossMargin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingMargin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      profitBeforeTaxMargin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      netIncomeMargin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      incomeTaxToProfitBeforeTaxRatio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingExpenseRatio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      researchAndDevelopmentExpensesToSalesRatio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nonOperatingIncomeToProfitBeforeTax: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sellingExpensesToSalesRatio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      administrativeExpensesToSalesRatio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      create_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      update_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('incomeStatements')
  },
}
