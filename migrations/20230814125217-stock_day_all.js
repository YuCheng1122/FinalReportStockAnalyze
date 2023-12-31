'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stock_day_all', {
      stock_day_all_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      stock_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stock', // 確保這裡的模型名稱與你的資料庫結構相符
          key: 'stock_id',
        },
        allowNull: true,
      },
      date: {
        type: Sequelize.DATEONLY, // 使用 DATEONLY 來儲存不帶時間的日期
        allowNull: true,
      },
      trade_volume: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      trade_value: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      opening_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      highest_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      lowest_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      closing_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      change: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      transaction: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      create_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      update_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stock_day_all');
  },
};
