'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('patient', 'doctor', 'admin'),
      allowNull: false,
    },
  }, {
    tableName: 'Users',
    timestamps: true,
  });

  User.associate = (models) => {
    User.hasOne(models.Doctor, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return User;
};