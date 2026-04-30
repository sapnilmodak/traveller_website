const { getModels } = require('../models');
const { getSequelize } = require('../config/db');

// @desc    Get all accessories
// @route   GET /api/accessories
// @access  Public
const getAccessories = async (req, res) => {
  try {
    const { category } = req.query;
    const { Accessory } = getModels();
    
    let where = {};
    if (category) {
      where.category = category;
    }

    const results = await Accessory.findAll({
      where,
      order: [['name', 'ASC']],
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all categories
// @route   GET /api/accessories/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const { Accessory } = getModels();
    const sequelize = getSequelize();
    const categories = await Accessory.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('category')), 'category']],
    });
    res.json(categories.map(c => c.category).filter(Boolean));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single accessory
// @route   GET /api/accessories/:id
// @access  Public
const getAccessoryById = async (req, res) => {
  try {
    const { Accessory } = getModels();
    const accessory = await Accessory.findByPk(req.params.id);
    if (accessory) {
      res.json(accessory);
    } else {
      res.status(404).json({ message: 'Accessory not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create an accessory
// @route   POST /api/admin/accessories
// @access  Private/Admin
const createAccessory = async (req, res) => {
  try {
    const { name, price, description, category, thumbSrc: bodyThumbSrc, images } = req.body;
    let thumbSrc = bodyThumbSrc || '';

    if (req.file) {
      thumbSrc = `/uploads/${req.file.filename}`;
    }

    const { Accessory } = getModels();
    const createdAccessory = await Accessory.create({
      name,
      price,
      description,
      thumbSrc,
      category: category || 'Equipment',
      images: images || [],
    });

    res.status(201).json(createdAccessory);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update an accessory
// @route   PUT /api/admin/accessories/:id
// @access  Private/Admin
const updateAccessory = async (req, res) => {
  try {
    const { Accessory } = getModels();
    const accessory = await Accessory.findByPk(req.params.id);

    if (accessory) {
      const updateData = { ...req.body };
      if (req.file) {
        updateData.thumbSrc = `/uploads/${req.file.filename}`;
      } else if (req.body.thumbSrc) {
        updateData.thumbSrc = req.body.thumbSrc;
      }

      await accessory.update(updateData);
      res.json(accessory);
    } else {
      res.status(404).json({ message: 'Accessory not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete an accessory
// @route   DELETE /api/admin/accessories/:id
// @access  Private/Admin
const deleteAccessory = async (req, res) => {
  try {
    const { Accessory } = getModels();
    const accessory = await Accessory.findByPk(req.params.id);

    if (accessory) {
      await accessory.destroy();
      res.json({ message: 'Accessory removed' });
    } else {
      res.status(404).json({ message: 'Accessory not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getAccessories,
  getCategories,
  getAccessoryById,
  createAccessory,
  updateAccessory,
  deleteAccessory,
};
