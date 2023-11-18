'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('individual_new', {
      individual_new_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stock_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'stock', // 或根據實際模型名稱進行調整
          key: 'stock_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      time: {
        type: Sequelize.STRING,
        allowNull: true
      },
      link: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      imageSrc: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      create_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      update_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('individual_new');
  }
};
