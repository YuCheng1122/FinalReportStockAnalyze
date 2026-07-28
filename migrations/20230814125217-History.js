'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('history', {
      history_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'user_id'
        },
        allowNull: false
      },
      method: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      stock_id: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      industry: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      predicted_percent: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      create_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      update_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('history');
  }
};
