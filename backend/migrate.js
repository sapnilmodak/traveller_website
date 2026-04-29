const mongoose = require('mongoose');
const { connectDB } = require('./config/db');
const { initModels } = require('./models');
const dotenv = require('dotenv');

dotenv.config();

const migrate = async () => {
  try {
    console.log('🚀 Starting Data Migration: MongoDB -> PostgreSQL (RDS)');

    // 1. Connect to MongoDB
    // Make sure MONGO_URI is set in your .env or provided here
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/traveler_db';
    console.log(`📡 Connecting to MongoDB: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // 2. Connect to PostgreSQL
    console.log('📡 Connecting to PostgreSQL RDS...');
    const sequelize = await connectDB();
    const models = initModels();
    await sequelize.sync({ alter: true });
    console.log('✅ Connected to PostgreSQL and synced models');

    // 3. Define Migration Mapping
    // [Mongo Model Name, PostgreSQL Sequelize Model]
    const migrationMap = [
      ['Admin', models.Admin],
      ['User', models.User],
      ['Package', models.Package],
      ['Activity', models.Activity],
      ['Cab', models.Cab],
      ['Rental', models.Rental],
      ['Hotel', models.Hotel],
      ['Blog', models.Blog],
      ['Team', models.Team],
      ['Contact', models.Contact],
      ['Enquiry', models.Enquiry],
    ];

    for (const [modelName, PgModel] of migrationMap) {
      console.log(`📦 Migrating ${modelName}...`);
      
      // Get data from MongoDB
      const mongoData = await mongoose.connection.db.collection(modelName.toLowerCase() + 's').find({}).toArray();
      
      if (mongoData.length === 0) {
        console.log(`   ⚠️ No data found for ${modelName}, skipping.`);
        continue;
      }

      console.log(`   🔍 Found ${mongoData.length} records in MongoDB.`);

      // Transform data (remove _id, __v, etc.)
      const cleanedData = mongoData.map(item => {
        const newItem = { ...item };
        delete newItem._id;
        delete newItem.__v;
        return newItem;
      });

      // Bulk Insert into PostgreSQL
      await PgModel.bulkCreate(cleanedData, { ignoreDuplicates: true });
      console.log(`   ✅ Successfully migrated ${modelName}.`);
    }

    console.log('✨ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
};

migrate();
