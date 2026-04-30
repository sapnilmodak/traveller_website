const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db');

const Accessory = () => {
  const sequelize = getSequelize();
  return sequelize.define('Accessory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
    },
    thumbSrc: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'Equipment',
    },
    images: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    _id: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.id;
      },
    },
  }, {
    tableName: 'accessories',
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });
};

module.exports = Accessory;
