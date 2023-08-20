"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Weather", {
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
        type: Sequelize.DECIMAL(5,2),
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
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      update_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Weather");
  },
};
