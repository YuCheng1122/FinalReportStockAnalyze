'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('income_statement', {
      income_statement_id: {
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
        onDelete: 'SET NULL',
      },
      income: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      income_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      operating_expenses: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      operating_expenses_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      net_income: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      net_income_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      net_income_rate: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      net_income_rate_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      eps: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      eps_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      operating_capital_flow: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      operating_capital_flow_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      valid_tax_rate: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      valid_tax_rate_ycp: {
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
    await queryInterface.dropTable('income_statement')
  },
}
