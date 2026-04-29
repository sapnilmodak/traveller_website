const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { initModels } = require('./models');
const seedDatabase = require('./seed');
const path = require('path');

// Load env vars
dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'https://miracleladakhadventure.com',
  'https://admin.miracleladakhadventure.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.indexOf(origin) !== -1 || 
                     origin.includes('miracleladakhadventure.com') ||
                     origin.includes('localhost');

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('Origin not allowed:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for file uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic route
app.get('/', (req, res) => {
  res.send('Traveler API is running...');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const packageRoutes = require('./routes/packageRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const activityRoutes = require('./routes/activityRoutes');
const cabRoutes = require('./routes/cabRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const blogRoutes = require('./routes/blogRoutes');
const teamRoutes = require('./routes/teamRoutes');
const contactRoutes = require('./routes/contactRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/admin', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/cabs', cabRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;

// Initialize Database and Start Server
const startServer = async () => {
  try {
    const sequelize = await connectDB();
    initModels();

    // Sync models to database
    // In production, you might want to use migrations instead of sync({ alter: true })
    await sequelize.sync({ alter: true });
    console.log('Database models synced');

    // Optional: Seed database if needed
    try {
      await seedDatabase();
    } catch (seedErr) {
      console.error('Seed warning (non-fatal):', seedErr.message);
    }

    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    // Wait a bit before exiting in dev to see logs
    setTimeout(() => process.exit(1), 5000);
  }
};

startServer();
