'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('log', 'errorloaction', 'errorlocation');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('log', 'errorlocation', 'errorloaction');
  }
};
