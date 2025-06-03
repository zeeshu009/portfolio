const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./Patient');

const LabResult = sequelize.define('LabResult', {
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
  fileUrl: {
    type: DataTypes.STRING,
  },
  result: {
    type: DataTypes.TEXT,
  },
  aiAnalysis: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
});

module.exports = LabResult;