const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db');

const Page = () => {
  const sequelize = getSequelize();
  return sequelize.define('Page', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'pages',
    timestamps: true
  });
};

module.exports = Page;
