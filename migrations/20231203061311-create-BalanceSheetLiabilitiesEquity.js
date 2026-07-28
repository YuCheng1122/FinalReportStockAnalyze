'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('balancesheetliabilitiesequity', {
      balancesheetliabilitiesequity_id: {
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
      liabilities: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      currentliabilities: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      longtermliabilities: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      accountsandnotespayable: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      advancereceipts: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      shorttermborrowings: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      shorttermnotesandbillspayable: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      longtermliabilitiescurrentportion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      equity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      commonstocks: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      retainedearnings: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nav: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      roe: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      roet4q: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reinvestmentrate: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      debtratio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      accountsandnotespayableturnoverdays: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('balancesheetliabilitiesequity')
  },
}
