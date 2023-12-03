'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('assetStatements', {
      assetStatements_id: {
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
      assets: {
        type: Sequelize.STRING,
        allowNull: true
      },
      currentAssets: {
        type: Sequelize.STRING,
        allowNull: true
      },
      longTermInvestment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      shortTermInvestment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fixedAssets: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cashAndCashEquivalents: {
        type: Sequelize.STRING,
        allowNull: true
      },
      accountsAndNotesReceivable: {
        type: Sequelize.STRING,
        allowNull: true
      },
      inventories: {
        type: Sequelize.STRING,
        allowNull: true
      },
      roa: {
        type: Sequelize.STRING,
        allowNull: true
      },
      roaT4Q: {
        type: Sequelize.STRING,
        allowNull: true
      },
      currentRatio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      quickRatio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      longTermLiabilitiesRatio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      accountsAndNotesReceivableTurnoverRatio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      inventoryTurnoverRatio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fixedAssetsTurnoverRatio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      assetsTurnoverRatio: {
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
    await queryInterface.dropTable('assetStatements')
  }
};
