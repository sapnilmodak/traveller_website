const { Op } = require('sequelize');
const { getModels } = require('../models');

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
const getActivities = async (req, res) => {
  try {
    const { isFeatured, category, destination, limit } = req.query;
    const where = {};

    if (isFeatured) where.isFeatured = true;
    if (category) {
      const categories = category.split(',');
      where.category = { [Op.in]: categories };
    }
    if (destination) {
      const destinations = destination.split(',').map(d => d.trim());
      where.destination = { [Op.iLike]: { [Op.any]: destinations } };
    }

    const options = {
      where,
      order: [['createdAt', 'DESC']],
    };

    if (limit) options.limit = parseInt(limit);

    const { Activity } = getModels();
    const results = await Activity.findAll(options);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get unique activity categories
// @route   GET /api/activities/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const { Activity } = getModels();
    const results = await Activity.findAll({
      attributes: ['category'],
      group: ['category'],
      raw: true,
    });
    res.json(results.map(r => r.category).filter(c => c != null && c.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get unique activity destinations
// @route   GET /api/activities/destinations
// @access  Public
const getDestinations = async (req, res) => {
  try {
    const { Activity } = getModels();
    const results = await Activity.findAll({
      attributes: ['destination'],
      group: ['destination'],
      raw: true,
    });
    res.json(results.map(r => r.destination).filter(d => d != null && d.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single activity
// @route   GET /api/activities/:id
// @access  Public
const getActivityById = async (req, res) => {
  try {
    const { Activity } = getModels();
    const activity = await Activity.findByPk(req.params.id);
    if (activity) {
      res.json(activity);
    } else {
      res.status(404).json({ message: 'Activity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create an activity
// @route   POST /api/admin/activities
// @access  Private/Admin
const createActivity = async (req, res) => {
  try {
    const { title, price, category, destination, description } = req.body;
    let src = '';

    if (req.file) {
      src = `/uploads/${req.file.filename}`;
    } else {
      src = req.body.src || '';
    }

    if (!title || !src) {
      return res.status(400).json({ message: 'Title and image are required' });
    }

    const { Activity } = getModels();
    const createdActivity = await Activity.create({
      title,
      src,
      price: price || 0,
      category,
      destination,
      description,
      isFeatured: req.body.isFeatured || false,
    });

    res.status(201).json(createdActivity);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update an activity
// @route   PUT /api/admin/activities/:id
// @access  Private/Admin
const updateActivity = async (req, res) => {
  try {
    const { Activity } = getModels();
    const activity = await Activity.findByPk(req.params.id);

    if (activity) {
      const updateData = {};
      if (req.body.title) updateData.title = req.body.title;
      if (req.body.price !== undefined) updateData.price = req.body.price;
      if (req.body.category) updateData.category = req.body.category;
      if (req.body.destination) updateData.destination = req.body.destination;
      if (req.body.description) updateData.description = req.body.description;
      if (req.body.isFeatured !== undefined) updateData.isFeatured = req.body.isFeatured;

      if (req.file) {
        updateData.src = `/uploads/${req.file.filename}`;
      } else if (req.body.src) {
        updateData.src = req.body.src;
      }

      await activity.update(updateData);
      res.json(activity);
    } else {
      res.status(404).json({ message: 'Activity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete an activity
// @route   DELETE /api/admin/activities/:id
// @access  Private/Admin
const deleteActivity = async (req, res) => {
  try {
    const { Activity } = getModels();
    const activity = await Activity.findByPk(req.params.id);

    if (activity) {
      await activity.destroy();
      res.json({ message: 'Activity removed' });
    } else {
      res.status(404).json({ message: 'Activity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getActivities,
  getCategories,
  getDestinations,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity
};
