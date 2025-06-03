'use strict';

     module.exports = {
       up: async (queryInterface, Sequelize) => {
         await queryInterface.createTable('Doctors', {
           id: {
             allowNull: false,
             autoIncrement: true,
             primaryKey: true,
             type: Sequelize.INTEGER,
           },
           userId: {
             type: Sequelize.INTEGER,
             references: { model: 'Users', key: 'id' },
             allowNull: false,
           },
           name: {
             type: Sequelize.STRING,
             allowNull: false,
           },
           education: {
             type: Sequelize.STRING,
             allowNull: false,
           },
           specialization: {
             type: Sequelize.STRING,
             allowNull: false,
           },
           licenseNumber: {
             type: Sequelize.STRING,
             unique: true,
             allowNull: false,
           },
           experienceYears: {
             type: Sequelize.INTEGER,
             allowNull: false,
           },
           status: {
             type: Sequelize.ENUM('pending', 'approved', 'rejected'),
             defaultValue: 'pending',
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
         await queryInterface.dropTable('Doctors');
       },
     };