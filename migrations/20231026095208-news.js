'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GoogleNewsArticles', {
      news_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      time: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      link: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imageSrc: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable('GoogleNewsArticles')
  },
}
