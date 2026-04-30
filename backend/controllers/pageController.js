const Page = require('../models/Page');

// @desc    Get all pages
// @route   GET /api/pages
// @access  Public
const getPages = async (req, res) => {
  try {
    const pages = await Page.findAll();
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single page by slug
// @route   GET /api/pages/:slug
// @access  Public
const getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    if (page) {
      res.json(page);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or Update page
// @route   POST /api/pages
// @access  Private/Admin
const upsertPage = async (req, res) => {
  try {
    const { slug, title, content } = req.body;
    
    let page = await Page.findOne({ where: { slug } });
    
    if (page) {
      page.title = title;
      page.content = content;
      await page.save();
      res.json(page);
    } else {
      page = await Page.create({ slug, title, content });
      res.status(201).json(page);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPages,
  getPageBySlug,
  upsertPage
};
