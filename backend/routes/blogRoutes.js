const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.route('/').get(getBlogs);
router.route('/:id').get(getBlogById);

router.route('/')
  .post(protect, createBlog);

router.route('/:id')
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;
