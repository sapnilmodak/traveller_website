const express = require('express');
const router = express.Router();
const {
  getActivities,
  getCategories,
  getDestinations,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity
} = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.route('/').get(getActivities);
router.route('/categories').get(getCategories);
router.route('/destinations').get(getDestinations);
router.route('/:id').get(getActivityById);

router.route('/')
  .post(protect, createActivity);

router.route('/:id')
  .put(protect, updateActivity)
  .delete(protect, deleteActivity);

module.exports = router;
