'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Weather', {
      weather_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      temperature: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      humidity: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      precipitation: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true,
      },
      create_date: {
        type: Sequelize.DATE,
<<<<<<< HEAD
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      update_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
=======
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      update_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
>>>>>>> 5732aa4b18d72bd91b254a7c42358eb0e97fc3e5
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Weather')
  },
}
