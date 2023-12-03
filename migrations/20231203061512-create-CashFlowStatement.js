'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cashFlowStatement', {
      cashFlowStatement_id: {
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
      depreciation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      amortization: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingCashFlow: {
        type: Sequelize.STRING,
        allowNull: true
      },
      investingCashFlow: {
        type: Sequelize.STRING,
        allowNull: true
      },
      financingCashFlow: {
        type: Sequelize.STRING,
        allowNull: true
      },
      freeCashFlow: {
        type: Sequelize.STRING,
        allowNull: true
      },
      netCashFlow: {
        type: Sequelize.STRING,
        allowNull: true
      },
      capex: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingCashFlowPerShare: {
        type: Sequelize.STRING,
        allowNull: true
      },
      investingCashFlowPerShare: {
        type: Sequelize.STRING,
        allowNull: true
      },
      financingCashFlowPerShare: {
        type: Sequelize.STRING,
        allowNull: true
      },
      freeCashFlowPerShare: {
        type: Sequelize.STRING,
        allowNull: true
      },
      netCashFlowPerShare: {
        type: Sequelize.STRING,
        allowNull: true
      },
      interestCoverageRatio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingCashFlowToCurrentLiabilitiesRatio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingCashFlowToLiabilitiesRatio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingCashFlowToNetIncomeRatio: {
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cashFlowStatement')
  }
};
