const express = require('express');
const router = express.Router();
const {
  getRentals,
  getTypes,
  getDestinations,
  getRentalById,
  createRental,
  updateRental,
  deleteRental
} = require('../controllers/rentalController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.route('/').get(getRentals);
router.route('/types').get(getTypes);
router.route('/destinations').get(getDestinations);
router.route('/:id').get(getRentalById);

router.route('/')
  .post(protect, createRental);

router.route('/:id')
  .put(protect, updateRental)
  .delete(protect, deleteRental);

module.exports = router;
