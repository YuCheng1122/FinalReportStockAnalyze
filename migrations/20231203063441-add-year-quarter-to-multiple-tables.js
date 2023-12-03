'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tables = ['assetStatements', 'incomeStatements', 'balanceSheetLiabilitiesEquity', 'cashFlowStatement']
    for (const table of tables) {
      await queryInterface.addColumn(table, 'year', {
        type: Sequelize.INTEGER,
        allowNull: false,
      })
      await queryInterface.addColumn(table, 'quarter', {
        type: Sequelize.INTEGER,
        allowNull: false,
      })
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = ['assetStatements', 'incomeStatements', 'balanceSheetLiabilitiesEquity', 'cashFlowStatement']
    for (const table of tables) {
      await queryInterface.removeColumn(table, 'year')
      await queryInterface.removeColumn(table, 'quarter')
    }
  },
}
