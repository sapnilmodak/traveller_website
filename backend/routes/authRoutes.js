const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getMe,
  getAdminStats,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/me', protect, getMe);
router.get('/stats', protect, getAdminStats);

module.exports = router;
