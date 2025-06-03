'use strict';

     module.exports = {
       up: async (queryInterface, Sequelize) => {
         await queryInterface.createTable('Users', {
           id: {
             allowNull: false,
             autoIncrement: true,
             primaryKey: true,
             type: Sequelize.INTEGER,
           },
           name: {
             type: Sequelize.STRING,
             allowNull: false,
           },
           email: {
             type: Sequelize.STRING,
             unique: true,
             allowNull: false,
           },
           password: {
             type: Sequelize.STRING,
             allowNull: false,
           },
           role: {
             type: Sequelize.ENUM('admin', 'doctor', 'patient'),
             allowNull: false,
           },
           createdAt: {
             allowNull: false,
             type: Sequelize.DATE,
           },
           updatedAt: {
             allowNull: false,
             type: Sequelize.DATE,
           },
         });
       },
       down: async (queryInterface) => {
         await queryInterface.dropTable('Users');
       },
     };