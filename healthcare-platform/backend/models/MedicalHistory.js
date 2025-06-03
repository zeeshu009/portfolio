const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./Patient');

const MedicalHistory = sequelize.define('MedicalHistory', {
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
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  diagnosis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  treatment: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

module.exports = MedicalHistory;