'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('log', {
      log_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.STRING,
        allowNull: false
      },
      message:{
        type: Sequelize.TEXT,
        allowNull: true
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      errorSource: {
        type: Sequelize.STRING,
        allowNull: true
      },
      errorLoaction: {
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
    await queryInterface.dropTable('log')
  }
};
