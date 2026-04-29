const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db');

const Cab = () => {
  const sequelize = getSequelize();
  return sequelize.define('Cab', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seats: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.STRING,
    },
    capacity: {
      type: DataTypes.STRING,
    },
    thumbSrc: {
      type: DataTypes.STRING,
    },
    destination: {
      type: DataTypes.STRING,
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'cabs',
    timestamps: true,
  });
};

module.exports = Cab;
