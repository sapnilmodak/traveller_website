const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getModels } = require('../models');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const getAdminStats = async (req, res) => {
  try {
    const { Package, Activity, Enquiry, Contact, Blog, User } = getModels();
    const [packages, activities, enquiries, messages, blogs, users, recentEnquiries] = await Promise.all([
      Package.count(),
      Activity.count(),
      Enquiry.count(),
      Contact.count(),
      Blog.count(),
      User.count(),
      Enquiry.findAll({ order: [['createdAt', 'DESC']], limit: 5 })
    ]);
    res.json({ packages, activities, enquiries, messages, blogs, users, recentEnquiries });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }
    const { Admin } = getModels();
    const adminExists = await Admin.findOne({ where: { email } });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await Admin.create({ name, email, password: hashedPassword });
    if (admin) {
      res.status(201).json({
        _id: admin.id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { Admin } = getModels();
    const admin = await Admin.findOne({ where: { email } });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        _id: admin.id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getMe = async (req, res) => {
  res.status(200).json(req.admin || req.user);
};

module.exports = { registerAdmin, loginAdmin, getMe, getAdminStats };
