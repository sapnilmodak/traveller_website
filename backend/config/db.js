const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

let sequelize = null;

const connectDB = async () => {
  try {
    const sslCertPath = path.join(__dirname, '..', 'global-bundle.pem');
    
    const dialectOptions = {};
    if (fs.existsSync(sslCertPath)) {
      dialectOptions.ssl = {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync(sslCertPath).toString(),
      };
    }

    sequelize = new Sequelize(
      process.env.RDS_DB_NAME,
      process.env.RDS_USERNAME,
      process.env.RDS_PASSWORD,
      {
        host: process.env.RDS_HOSTNAME,
        port: parseInt(process.env.RDS_PORT || '5432'),
        dialect: 'postgres',
        dialectOptions,
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      }
    );

    await sequelize.authenticate();
    console.log(`PostgreSQL Connected: ${process.env.RDS_HOSTNAME}`);

    return sequelize;
  } catch (error) {
    console.error(`Error connecting to PostgreSQL: ${error.message}`);
    process.exit(1);
  }
};

const getSequelize = () => sequelize;

module.exports = { connectDB, getSequelize };
