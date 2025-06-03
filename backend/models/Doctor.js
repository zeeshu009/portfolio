'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Doctor = sequelize.define('Doctor', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    education: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    licenseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experienceYears: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
    },
  }, {
    tableName: 'Doctors',
    timestamps: true,
  });

  Doctor.associate = (models) => {
    Doctor.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return Doctor;
};