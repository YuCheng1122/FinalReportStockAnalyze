'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('technical_analysis', {
      technical_analysis_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      stock_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      weaklyAvg: {
        type: Sequelize.FLOAT(10, 4),
        allowNull: true,
      },
      avg20: {
        type: Sequelize.FLOAT(10, 4),
        allowNull: true,
      },
      avg60: {
        type: Sequelize.FLOAT(10, 4),
        allowNull: true,
      },
      ema: {
        type: Sequelize.FLOAT(10, 4),
        allowNull: true,
      },
      dif: {
        type: Sequelize.FLOAT(10, 4),
        allowNull: true,
      },
      macd: {
        type: Sequelize.FLOAT(10, 4),
        allowNull: true,
      },
      rsi: {
        type: Sequelize.FLOAT(10, 4),
        allowNull: true,
      },
      k: {
        type: Sequelize.FLOAT(10, 4),
        allowNull: true,
      },
      d: {
        type: Sequelize.FLOAT(10, 4),
        allowNull: true,
      },
      create_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      update_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('technical_analysis')
  },
}
