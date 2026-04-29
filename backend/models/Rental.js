const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db');

const Rental = () => {
  const sequelize = getSequelize();
  return sequelize.define('Rental', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    engine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    type: {
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
    tableName: 'rentals',
    timestamps: true,
  });
};

module.exports = Rental;
