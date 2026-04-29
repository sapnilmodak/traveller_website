const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db');

const Contact = () => {
  const sequelize = getSequelize();
  return sequelize.define('Contact', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Unread',
      validate: {
        isIn: [['Unread', 'Read', 'Replied']],
      },
    },
  }, {
    tableName: 'contacts',
    timestamps: true,
  });
};

module.exports = Contact;
