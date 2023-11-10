'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('bwibbu_all', 'date', {
      type: Sequelize.DATEONLY,
      allowNull: false, // 根据需求设定是否允许null值
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('bwibbu_all', 'date');
  }
};
