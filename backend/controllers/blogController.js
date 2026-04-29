const { getModels } = require('../models');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const { isFeatured, limit } = req.query;
    const where = {};
    if (isFeatured) where.isFeatured = true;

    const options = {
      where,
      order: [['createdAt', 'DESC']],
    };
    if (limit) options.limit = parseInt(limit);

    const { Blog } = getModels();
    const results = await Blog.findAll(options);
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
    const { Blog } = getModels();
    const blog = await Blog.findByPk(req.params.id);
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

    const { Blog } = getModels();
    const createdBlog = await Blog.create({
      title,
      src,
      excerpt,
      content,
      author: author || 'Admin',
      date,
      isFeatured: req.body.isFeatured || false,
    });

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
    const { Blog } = getModels();
    const blog = await Blog.findByPk(req.params.id);

    if (blog) {
      const updateData = {};
      if (req.body.title) updateData.title = req.body.title;
      if (req.body.excerpt) updateData.excerpt = req.body.excerpt;
      if (req.body.content) updateData.content = req.body.content;
      if (req.body.author) updateData.author = req.body.author;
      if (req.body.date) updateData.date = req.body.date;
      if (req.body.isFeatured !== undefined) updateData.isFeatured = req.body.isFeatured;

      if (req.file) {
        updateData.src = `/uploads/${req.file.filename}`;
      } else if (req.body.src) {
        updateData.src = req.body.src;
      }

      await blog.update(updateData);
      res.json(blog);
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
    const { Blog } = getModels();
    const blog = await Blog.findByPk(req.params.id);

    if (blog) {
      await blog.destroy();
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
