'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('googlenewsarticles', 'source_name', {
      type: Sequelize.STRING(255),
      allowNull: true,
    })
    await queryInterface.addColumn('googlenewsarticles', 'source_icon', {
      type: Sequelize.TEXT,
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('googlenewsarticles', 'source_name')
    await queryInterface.removeColumn('googlenewsarticles', 'source_icon')
  },
}
