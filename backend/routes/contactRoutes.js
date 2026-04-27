const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  updateContactStatus
} = require('../controllers/contactController');
const { protect } = require('../middlewares/authMiddleware');

// Public route to submit a contact message
router.route('/').post(createContact);

// Admin routes
router.route('/')
  .get(protect, getContacts);

router.route('/:id/status')
  .put(protect, updateContactStatus);

module.exports = router;
