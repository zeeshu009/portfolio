'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Appointments', 'status', {
      type: Sequelize.ENUM('pending', 'approved', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'approved',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Appointments', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'approved',
    });
  },
};