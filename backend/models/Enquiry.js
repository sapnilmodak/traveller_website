const { DataTypes } = require('sequelize');
const { getSequelize } = require('../config/db');

const Enquiry = () => {
  const sequelize = getSequelize();
  return sequelize.define('Enquiry', {
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
      validate: {
        is: /^[0-9]{10}$/i,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    destination: {
      type: DataTypes.STRING,
    },
    travelDate: {
      type: DataTypes.DATEONLY,
    },
    days: {
      type: DataTypes.INTEGER,
    },
    persons: {
      type: DataTypes.INTEGER,
    },
    comments: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending',
      validate: {
        isIn: [['Pending', 'Contacted', 'Converted', 'Closed']],
      },
    },
    _id: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.id;
      },
    },
  }, {
    tableName: 'enquiries',
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });
};

module.exports = Enquiry;
