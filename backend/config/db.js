const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

let sequelize = null;

const connectDB = async () => {
  try {
    const sslCertPath = path.join(__dirname, '..', 'global-bundle.pem');
    
    const dialectOptions = {};
    if (fs.existsSync(sslCertPath)) {
      console.log('✅ SSL Certificate found at:', sslCertPath);
      dialectOptions.ssl = {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync(sslCertPath).toString(),
      };
    } else {
      console.log('⚠️ SSL Certificate NOT FOUND at:', sslCertPath);
    }

    let password = process.env.RDS_PASSWORD || '';
    // Clean password from accidental quotes
    if ((password.startsWith('"') && password.endsWith('"')) || 
        (password.startsWith("'") && password.endsWith("'"))) {
      password = password.slice(1, -1);
    }

    sequelize = new Sequelize(
      process.env.RDS_DB_NAME,
      process.env.RDS_USERNAME,
      password,
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
    // Print more details for auth errors
    if (error.message.includes('password authentication failed')) {
      console.error('TIP: Check if your RDS_PASSWORD in .env has hidden quotes or special characters.');
    }
    process.exit(1);
  }
};

const getSequelize = () => sequelize;

module.exports = { connectDB, getSequelize };
