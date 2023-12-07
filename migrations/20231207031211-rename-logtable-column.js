'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('log', 'errorLoaction', 'errorLocation');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('log', 'errorLocation', 'errorLoaction');
  }
};
