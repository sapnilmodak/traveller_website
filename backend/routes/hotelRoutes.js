const express = require('express');
const router = express.Router();
const {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel
} = require('../controllers/hotelController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.route('/').get(getHotels);
router.route('/:id').get(getHotelById);

router.route('/')
  .post(protect, createHotel);

router.route('/:id')
  .put(protect, updateHotel)
  .delete(protect, deleteHotel);

module.exports = router;
