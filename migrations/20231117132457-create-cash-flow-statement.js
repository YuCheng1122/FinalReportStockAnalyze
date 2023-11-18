'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cash_flow_statement', {
      cash_flow_statement_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      stock_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'stock', // 或根據實際模型名稱進行調整
          key: 'stock_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      net_income: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      net_income_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      operating_cash: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      operating_cash_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      investment_cash: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      investment_cash_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      financing_cash: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      financing_cash_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      net_change_in_cash: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      net_change_in_cash_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      free_cash_flow: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      free_cash_flow_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      create_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      update_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cash_flow_statement')
  },
}
