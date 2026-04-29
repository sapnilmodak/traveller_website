const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db');

const Team = () => {
  const sequelize = getSequelize();
  return sequelize.define('Team', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_title: {
      type: DataTypes.STRING,
    },
    teamSrc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quote: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'teams',
    timestamps: true,
  });
};

module.exports = Team;
