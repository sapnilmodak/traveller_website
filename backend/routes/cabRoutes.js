const express = require('express');
const router = express.Router();
const {
  getCabs,
  getTypes,
  getDestinations,
  getCabById,
  createCab,
  updateCab,
  deleteCab
} = require('../controllers/cabController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.route('/').get(getCabs);
router.route('/types').get(getTypes);
router.route('/destinations').get(getDestinations);
router.route('/:id').get(getCabById);

router.route('/')
  .post(protect, createCab);

router.route('/:id')
  .put(protect, updateCab)
  .delete(protect, deleteCab);

module.exports = router;
