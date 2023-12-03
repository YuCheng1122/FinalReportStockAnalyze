'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('balanceSheetLiabilitiesEquity', {
      balanceSheetLiabilitiesEquity_id: {
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
        onDelete: 'SET NULL'
      },
      liabilities: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      currentLiabilities: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      longTermLiabilities: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      accountsAndNotesPayable: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      advanceReceipts: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      shortTermBorrowings: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      shortTermNotesAndBillsPayable: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      longTermLiabilitiesCurrentPortion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      equity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      commonStocks: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      retainedEarnings: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nav: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      roe: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      roeT4Q: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reinvestmentRate: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      debtRatio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      accountsAndNotesPayableTurnoverDays: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('balanceSheetLiabilitiesEquity')
  },
}
