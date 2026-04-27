const jwt = require('jsonwebtoken');
const { clerkClient } = require('@clerk/clerk-sdk-node');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    // Try to verify as Custom JWT first
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.id).select('-password');
      if (req.admin) {
        return next();
      }
    } catch (jwtError) {
      // If JWT fails, it might be a Clerk token
      // We fall through to Clerk verification
    }

    // Try verifying as Clerk token
    const clerkSession = await clerkClient.verifyToken(token);
    if (clerkSession) {
      req.user = clerkSession; // Attach Clerk user info
      return next();
    }

    return res.status(401).json({ message: 'Not authorized, token failed' });

  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };
