const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const { isFeatured, limit } = req.query;
    let query = {};
    if (isFeatured) query.isFeatured = true;

    let blogs = Blog.find(query).sort({ createdAt: -1 });
    if (limit) {
      blogs = blogs.limit(parseInt(limit));
    }

    const results = await blogs;
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a blog
// @route   POST /api/admin/blogs
// @access  Private/Admin
const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, author, date } = req.body;
    let src = '';

    if (req.file) {
      src = `/uploads/${req.file.filename}`;
    } else {
      src = req.body.src || '';
    }

    if (!title || !src || !content || !excerpt || !date) {
      return res.status(400).json({ message: 'Title, excerpt, content, date and image are required' });
    }

    const blog = new Blog({
      title,
      src,
      excerpt,
      content,
      author: author || 'Admin',
      date,
      isFeatured: req.body.isFeatured || false,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a blog
// @route   PUT /api/admin/blogs/:id
// @access  Private/Admin
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      blog.title = req.body.title || blog.title;
      blog.excerpt = req.body.excerpt || blog.excerpt;
      blog.content = req.body.content || blog.content;
      blog.author = req.body.author || blog.author;
      blog.date = req.body.date || blog.date;
      blog.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : blog.isFeatured;

      if (req.file) {
        blog.src = `/uploads/${req.file.filename}`;
      } else if (req.body.src) {
        blog.src = req.body.src;
      }

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/admin/blogs/:id
// @access  Private/Admin
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      await blog.deleteOne();
      res.json({ message: 'Blog removed' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
