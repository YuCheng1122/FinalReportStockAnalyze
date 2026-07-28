'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cashflowstatement', {
      cashflowstatement_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      stock_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'stock', // 或根據實際模型名稱進行調整
          key: 'stock_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      depreciation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      amortization: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingcashflow: {
        type: Sequelize.STRING,
        allowNull: true
      },
      investingcashflow: {
        type: Sequelize.STRING,
        allowNull: true
      },
      financingcashflow: {
        type: Sequelize.STRING,
        allowNull: true
      },
      freecashflow: {
        type: Sequelize.STRING,
        allowNull: true
      },
      netcashflow: {
        type: Sequelize.STRING,
        allowNull: true
      },
      capex: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingcashflowpershare: {
        type: Sequelize.STRING,
        allowNull: true
      },
      investingcashflowpershare: {
        type: Sequelize.STRING,
        allowNull: true
      },
      financingcashflowpershare: {
        type: Sequelize.STRING,
        allowNull: true
      },
      freecashflowpershare: {
        type: Sequelize.STRING,
        allowNull: true
      },
      netcashflowpershare: {
        type: Sequelize.STRING,
        allowNull: true
      },
      interestcoverageratio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingcashflowtocurrentliabilitiesratio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingcashflowtoliabilitiesratio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingcashflowtonetincomeratio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      create_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      update_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cashflowstatement')
  }
};
