const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Package = require('../models/Package');
const Activity = require('../models/Activity');
const Enquiry = require('../models/Enquiry');
const Contact = require('../models/Contact');
const Blog = require('../models/Blog');
const User = require('../models/User');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private
const getAdminStats = async (req, res) => {
  try {
    const [packages, activities, enquiries, messages, blogs, users, recentEnquiries] = await Promise.all([
      Package.countDocuments(),
      Activity.countDocuments(),
      Enquiry.countDocuments(),
      Contact.countDocuments(),
      Blog.countDocuments(),
      User.countDocuments(),
      Enquiry.find().sort({ createdAt: -1 }).limit(5)
    ]);

    res.json({
      packages,
      activities,
      enquiries,
      messages,
      blogs,
      users,
      recentEnquiries
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new admin
// @route   POST /api/admin/register
// @access  Public (Should ideally be restricted/protected in production)
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if admin exists
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    if (admin) {
      res.status(201).json({
        _id: admin.id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Authenticate a admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for admin email
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        _id: admin.id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get admin data
// @route   GET /api/admin/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json(req.admin || req.user); // Supports both JWT (req.admin) and Clerk (req.user)
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getMe,
  getAdminStats
};
