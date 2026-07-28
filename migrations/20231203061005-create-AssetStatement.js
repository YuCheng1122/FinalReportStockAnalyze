'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('assetstatements', {
      assetstatements_id: {
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
      currentassets: {
        type: Sequelize.STRING,
        allowNull: true
      },
      longterminvestment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      shortterminvestment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fixedassets: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cashandcashequivalents: {
        type: Sequelize.STRING,
        allowNull: true
      },
      accountsandnotesreceivable: {
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
      roat4q: {
        type: Sequelize.STRING,
        allowNull: true
      },
      currentratio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      quickratio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      longtermliabilitiesratio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      accountsandnotesreceivableturnoverratio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      inventoryturnoverratio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fixedassetsturnoverratio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      assetsturnoverratio: {
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
    await queryInterface.dropTable('assetstatements')
  }
};
