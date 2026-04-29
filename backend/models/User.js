const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db');

const User = () => {
  const sequelize = getSequelize();
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
  }, {
    tableName: 'users',
    timestamps: true,
  });
};

module.exports = User;
