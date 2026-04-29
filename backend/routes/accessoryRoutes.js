const express = require('express');
const router = express.Router();
const {
  getAccessories,
  getCategories,
  getAccessoryById,
  createAccessory,
  updateAccessory,
  deleteAccessory,
} = require('../controllers/accessoryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Public routes
router.route('/').get(getAccessories);
router.route('/categories').get(getCategories);
router.route('/:id').get(getAccessoryById);

// Admin routes
router.route('/')
  .post(protect, upload.single('image'), createAccessory);

router.route('/:id')
  .put(protect, upload.single('image'), updateAccessory)
  .delete(protect, deleteAccessory);

module.exports = router;
