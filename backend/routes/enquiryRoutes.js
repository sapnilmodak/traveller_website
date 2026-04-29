const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');

// Public route to submit an enquiry
router.route('/').post(createEnquiry);

// Admin routes
router.route('/')
  .get(protect, getEnquiries);

router.route('/:id/status')
  .put(protect, updateEnquiryStatus);

module.exports = router;
