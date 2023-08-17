'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BWIBBU_ALL', {
      bwibbu_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      stock_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stock',
          key: 'stock_id'
        },
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      p_e_ratio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      dividend_yield: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      p_b_ratio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      create_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      update_date: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BWIBBU_ALL');
  }
};
