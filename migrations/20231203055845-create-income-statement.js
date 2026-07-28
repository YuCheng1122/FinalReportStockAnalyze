'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('incomestatements', {
      incomestatements_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      stock_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'stock',
          key: 'stock_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      revenue: {
        type: Sequelize.STRING,
        allowNull: true
      },
      grossprofit: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingexpenses: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sellingexpenses: {
        type: Sequelize.STRING,
        allowNull: true
      },
      administrativeexpenses: {
        type: Sequelize.STRING,
        allowNull: true
      },
      researchanddevelopmentexpenses: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingincome: {
        type: Sequelize.STRING,
        allowNull: true
      },
      profitbeforetax: {
        type: Sequelize.STRING,
        allowNull: true
      },
      netincome: {
        type: Sequelize.STRING,
        allowNull: true
      },
      netincomeattributabletoownersoftheparent: {
        type: Sequelize.STRING,
        allowNull: true
      },
      eps: {
        type: Sequelize.STRING,
        allowNull: true
      },
      epsqoq: {
        type: Sequelize.STRING,
        allowNull: true
      },
      epsyoy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      epst4q: {
        type: Sequelize.STRING,
        allowNull: true
      },
      epst4qavg: {
        type: Sequelize.STRING,
        allowNull: true
      },
      epst4qqoq: {
        type: Sequelize.STRING,
        allowNull: true
      },
      epst4qyoy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      grossmargin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingmargin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      profitbeforetaxmargin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      netincomemargin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      incometaxtoprofitbeforetaxratio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operatingexpenseratio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      researchanddevelopmentexpensestosalesratio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nonoperatingincometoprofitbeforetax: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sellingexpensestosalesratio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      administrativeexpensestosalesratio: {
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('incomestatements')
  },
}
