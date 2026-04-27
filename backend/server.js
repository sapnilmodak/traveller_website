const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5174'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
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

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
