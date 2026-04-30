const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db');

const Package = () => {
  const sequelize = getSequelize();
  return sequelize.define('Package', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'Holiday Package',
    },
    url: {
      type: DataTypes.STRING,
    },
    thumbSrc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    nights: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    days: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
    },
    highlights: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    inclusions: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    exclusions: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    itinerary: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    _id: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.id;
      },
    },
  }, {
    tableName: 'packages',
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });
};

module.exports = Package;
