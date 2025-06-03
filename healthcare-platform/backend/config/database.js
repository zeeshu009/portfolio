const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Disable logging in production
  pool: {
    max: 5, // Max connections in pool
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;