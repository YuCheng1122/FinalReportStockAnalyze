"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("mi_index", {
      m_i_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      index: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      closing_index: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      rise_and_fall: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      point_change: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      percentage_change: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true,
      },
      special_handling_note: {
        type: Sequelize.TEXT,
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("mi_index");
  },
};
