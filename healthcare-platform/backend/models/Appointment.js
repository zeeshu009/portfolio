const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./Patient');
const User = require('./Users');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  patientId: {
    type: DataTypes.INTEGER,
    references: {
      model: Patient,
      key: 'id',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Scheduled', 'Completed', 'Cancelled'),
    defaultValue: 'Scheduled',
  },
}, {
  timestamps: true,
});

module.exports = Appointment;