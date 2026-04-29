const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db');

const Admin = () => {
  const sequelize = getSequelize();
  return sequelize.define('Admin', {
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
      defaultValue: 'admin',
    },
    _id: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.id;
      },
    },
  }, {
    tableName: 'admins',
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });
};

module.exports = Admin;
