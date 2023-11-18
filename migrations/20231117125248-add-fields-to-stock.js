'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('stock', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    })
    await queryInterface.addColumn('stock', 'ceo', {
      type: Sequelize.STRING,
      allowNull: true,
    })
    await queryInterface.addColumn('stock', 'established_time', {
      type: Sequelize.STRING,
      allowNull: true,
    })
    await queryInterface.addColumn('stock', 'headquater', {
      type: Sequelize.STRING,
      allowNull: true,
    })
    await queryInterface.addColumn('stock', 'website', {
      type: Sequelize.STRING,
      allowNull: true,
    })
    await queryInterface.addColumn('stock', 'staff_number', {
      type: Sequelize.STRING,
      allowNull: true,
    })
    await queryInterface.addColumn('stock', 'market_value', {
      type: Sequelize.STRING,
      allowNull: true,
    })
    await queryInterface.addColumn('stock', 'dividend_rate', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('stock', 'description')
    await queryInterface.removeColumn('stock', 'ceo')
    await queryInterface.removeColumn('stock', 'established_time')
    await queryInterface.removeColumn('stock', 'headquater')
    await queryInterface.removeColumn('stock', 'website')
    await queryInterface.removeColumn('stock', 'staff_number')
    await queryInterface.removeColumn('stock', 'market_value')
    await queryInterface.removeColumn('stock', 'dividend_rate')
  },
}
