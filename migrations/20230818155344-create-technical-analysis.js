'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FMTQIK', {
      f_m_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      trade_volume: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      trade_value: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      transaction: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      change: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      create_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      update_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FMTQIK')
  },
}
