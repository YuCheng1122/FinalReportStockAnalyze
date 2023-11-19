'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('taiex_data', {
      taiex_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      opening_index: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      highest_index: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      lowest_index: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      closing_index: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('taiex_data')
  },
}
