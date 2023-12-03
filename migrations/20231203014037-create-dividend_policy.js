'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('dividend_policy', {
      dividend_policy_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stock_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'stock', // 或根據實際模型名稱進行調整
          key: 'stock_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false
      },
      announcedDate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cashDividend: {
        type: Sequelize.FLOAT(4),
        allowNull: true
      },
      stockDividend: {
        type: Sequelize.FLOAT(4),
        allowNull: true
      },
      XDTradingDate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      XRTradingDate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cashDividendPaidDate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      XDPriceRecoveryDays: {
        type: Sequelize.STRING,
        allowNull: true
      },
      payoutType: {
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
    await queryInterface.dropTable('dividend_policy')
  }
};
