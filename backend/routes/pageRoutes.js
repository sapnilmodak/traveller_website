const express = require('express');
const router = express.Router();
const { getPages, getPageBySlug, upsertPage } = require('../controllers/pageController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getPages);
router.get('/:slug', getPageBySlug);
router.post('/', protect, upsertPage);

module.exports = router;
