const Activity = require('../models/Activity');

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
const getActivities = async (req, res) => {
  try {
    const { isFeatured, category, destination, limit } = req.query;
    let query = {};
    if (isFeatured) query.isFeatured = true;
    if (category) {
      const categories = category.split(',');
      query.category = { $in: categories };
    }
    if (destination) {
      const destinations = destination.split(',').map(d => new RegExp(`^${d.trim()}$`, 'i'));
      query.destination = { $in: destinations };
    }

    let activities = Activity.find(query).sort({ createdAt: -1 });
    if (limit) {
      activities = activities.limit(parseInt(limit));
    }

    const results = await activities;
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
    const categories = await Activity.distinct('category');
    res.json(categories.filter(c => c != null && c.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get unique activity destinations
// @route   GET /api/activities/destinations
// @access  Public
const getDestinations = async (req, res) => {
  try {
    const destinations = await Activity.distinct('destination');
    res.json(destinations.filter(d => d != null && d.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single activity
// @route   GET /api/activities/:id
// @access  Public
const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
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

    const activity = new Activity({
      title,
      src,
      price: price || 0,
      category,
      destination,
      description,
      isFeatured: req.body.isFeatured || false,
    });

    const createdActivity = await activity.save();
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
    const activity = await Activity.findById(req.params.id);

    if (activity) {
      activity.title = req.body.title || activity.title;
      activity.price = req.body.price !== undefined ? req.body.price : activity.price;
      activity.category = req.body.category || activity.category;
      activity.destination = req.body.destination || activity.destination;
      activity.description = req.body.description || activity.description;
      activity.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : activity.isFeatured;

      if (req.file) {
        activity.src = `/uploads/${req.file.filename}`;
      } else if (req.body.src) {
        activity.src = req.body.src;
      }

      const updatedActivity = await activity.save();
      res.json(updatedActivity);
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
    const activity = await Activity.findById(req.params.id);

    if (activity) {
      await activity.deleteOne();
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
