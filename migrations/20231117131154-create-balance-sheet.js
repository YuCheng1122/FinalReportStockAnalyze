'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('balance_sheet', {
      balance_sheet_id: {
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
      cash_and_short_term_investment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cash_and_short_term_investment_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      total_assets: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      total_assets_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      total_debts: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      total_debts_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      total_equitys: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      total_equitys_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tradable_shares: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tradable_shares_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pb_ratio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pb_ratio_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      roa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      roa_ycp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      roc: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      roc_ycp: {
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
    await queryInterface.dropTable('balance_sheet')
  },
}
