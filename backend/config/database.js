const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:my_password@localhost:5432/db_platform', {
  dialect: 'postgres',
  logging: false,
});

module.exports = { sequelize };