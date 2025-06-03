'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const VisitLog = sequelize.define('VisitLog', {
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
    visitDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'VisitLogs',
    timestamps: true,
  });

  VisitLog.associate = (models) => {
    VisitLog.belongsTo(models.User, { foreignKey: 'patientId', as: 'Patient' });
    VisitLog.belongsTo(models.Doctor, { foreignKey: 'doctorId', as: 'Doctor' });
    VisitLog.hasOne(models.Appointment, {
      foreignKey: 'patientId',
      sourceKey: 'patientId',
      constraints: false,
      scope: {
        doctorId: sequelize.where(sequelize.col('VisitLog.doctorId'), '=', sequelize.col('Appointment.doctorId')),
      },
      as: 'Appointment',
    });
  };

  return VisitLog;
};