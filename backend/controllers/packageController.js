const { Op } = require('sequelize');
const { getModels } = require('../models');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
const getPackages = async (req, res) => {
  try {
    const { isFeatured, destination, category, limit } = req.query;
    const where = {};

    if (isFeatured) where.isFeatured = true;

    if (destination) {
      const destinations = destination.split(',').map(d => d.trim());
      where.destination = { [Op.iLike]: { [Op.any]: destinations } };
    }

    if (category) {
      const categories = category.split(',');
      where.category = { [Op.in]: categories };
    }

    const options = {
      where,
      order: [['createdAt', 'DESC']],
    };

    if (limit) options.limit = parseInt(limit);

    const { Package } = getModels();
    const results = await Package.findAll(options);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get unique categories
// @route   GET /api/packages/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const { Package } = getModels();
    const results = await Package.findAll({
      attributes: ['category'],
      group: ['category'],
      raw: true,
    });
    res.json(results.map(r => r.category).filter(c => c != null && c.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get unique destinations
// @route   GET /api/packages/destinations
// @access  Public
const getDestinations = async (req, res) => {
  try {
    const { Package } = getModels();
    const results = await Package.findAll({
      attributes: ['destination'],
      group: ['destination'],
      raw: true,
    });
    res.json(results.map(r => r.destination).filter(d => d != null && d.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single package
// @route   GET /api/packages/:id
// @access  Public
const getPackageById = async (req, res) => {
  try {
    const { Package } = getModels();
    const pkg = await Package.findByPk(req.params.id);
    if (pkg) {
      res.json(pkg);
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a package
// @route   POST /api/admin/packages
// @access  Private/Admin
const createPackage = async (req, res) => {
  try {
    const { title, destination, category, url, nights, days, price, description, highlights, inclusions, exclusions, itinerary, images } = req.body;
    let thumbSrc = '';

    if (req.file) {
      thumbSrc = `/uploads/${req.file.filename}`;
    } else {
      thumbSrc = req.body.thumbSrc || '';
    }

    if (!title || !destination || !thumbSrc) {
      return res.status(400).json({ message: 'Title, destination, and image are required' });
    }

    const { Package } = getModels();
    const createdPackage = await Package.create({
      title,
      thumbSrc,
      url,
      destination,
      category: category || 'Holiday Package',
      nights: nights || 0,
      days: days || 1,
      price: price || 0,
      description,
      highlights: highlights || [],
      inclusions: inclusions || [],
      exclusions: exclusions || [],
      itinerary: itinerary || [],
      isFeatured: req.body.isFeatured || false,
      images: images || [],
    });

    res.status(201).json(createdPackage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a package
// @route   PUT /api/admin/packages/:id
// @access  Private/Admin
const updatePackage = async (req, res) => {
  try {
    const { Package } = getModels();
    const pkg = await Package.findByPk(req.params.id);

    if (pkg) {
      const updateData = {};
      if (req.body.title) updateData.title = req.body.title;
      if (req.body.destination) updateData.destination = req.body.destination;
      if (req.body.category) updateData.category = req.body.category;
      if (req.body.url !== undefined) updateData.url = req.body.url;
      if (req.body.nights !== undefined) updateData.nights = req.body.nights;
      if (req.body.days !== undefined) updateData.days = req.body.days;
      if (req.body.price !== undefined) updateData.price = req.body.price;
      if (req.body.description) updateData.description = req.body.description;
      if (req.body.highlights !== undefined) updateData.highlights = req.body.highlights;
      if (req.body.inclusions !== undefined) updateData.inclusions = req.body.inclusions;
      if (req.body.exclusions !== undefined) updateData.exclusions = req.body.exclusions;
      if (req.body.itinerary !== undefined) updateData.itinerary = req.body.itinerary;
      if (req.body.isFeatured !== undefined) updateData.isFeatured = req.body.isFeatured;
      if (req.body.images !== undefined) updateData.images = req.body.images;

      if (req.file) {
        updateData.thumbSrc = `/uploads/${req.file.filename}`;
      } else if (req.body.thumbSrc) {
        updateData.thumbSrc = req.body.thumbSrc;
      }

      await pkg.update(updateData);
      res.json(pkg);
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a package
// @route   DELETE /api/admin/packages/:id
// @access  Private/Admin
const deletePackage = async (req, res) => {
  try {
    const { Package } = getModels();
    const pkg = await Package.findByPk(req.params.id);

    if (pkg) {
      await pkg.destroy();
      res.json({ message: 'Package removed' });
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getPackages,
  getDestinations,
  getCategories,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
};
