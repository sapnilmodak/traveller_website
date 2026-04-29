const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db');

const Hotel = () => {
  const sequelize = getSequelize();
  return sequelize.define('Hotel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'hotels',
    timestamps: true,
  });
};

module.exports = Hotel;
