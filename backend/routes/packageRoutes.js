const express = require('express');
const router = express.Router();
const {
  getPackages,
  getDestinations,
  getCategories,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
} = require('../controllers/packageController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Public routes
router.route('/').get(getPackages);
router.route('/destinations').get(getDestinations);
router.route('/categories').get(getCategories);
router.route('/:id').get(getPackageById);

// Admin routes
// Since the prompt requires admin to post data, we use the auth middleware here.
// But we'll mount admin routes under /api/admin/packages in server.js
router.route('/')
  .post(protect, createPackage);

router.route('/:id')
  .put(protect, updatePackage)
  .delete(protect, deletePackage);

module.exports = router;
