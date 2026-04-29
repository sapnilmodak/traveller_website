const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db');

const Blog = () => {
  const sequelize = getSequelize();
  return sequelize.define('Blog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      defaultValue: 'Admin',
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'blogs',
    timestamps: true,
  });
};

module.exports = Blog;
