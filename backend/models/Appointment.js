'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Appointment = sequelize.define('Appointment', {
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
      onDelete: 'CASCADE',
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Doctors', key: 'id' },
      onDelete: 'CASCADE',
    },
    timeSlot: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'approved',
    },
  }, {
    tableName: 'Appointments',
    timestamps: true,
  });

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.User, { foreignKey: 'patientId', as: 'Patient' });
    Appointment.belongsTo(models.Doctor, { foreignKey: 'doctorId', as: 'Doctor' });
  };

  return Appointment;
};