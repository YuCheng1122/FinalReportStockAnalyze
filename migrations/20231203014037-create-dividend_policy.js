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
      },
      announceddate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cashdividend: {
        type: Sequelize.FLOAT(4),
        allowNull: true
      },
      stockdividend: {
        type: Sequelize.FLOAT(4),
        allowNull: true
      },
      xdtradingdate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      xrtradingdate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cashdividendpaiddate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      xdpricerecoverydays: {
        type: Sequelize.STRING,
        allowNull: true
      },
      payouttype: {
        type: Sequelize.STRING,
        allowNull: true
      },
      create_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      update_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('dividend_policy')
  }
};
