const { Op } = require('sequelize');
const { getModels } = require('../models');

// @desc    Get all cabs
// @route   GET /api/cabs
// @access  Public
const getCabs = async (req, res) => {
  try {
    const { isFeatured, type, destination, limit } = req.query;
    const where = {};

    if (isFeatured) where.isFeatured = true;
    if (type) {
      const types = type.split(',');
      where.type = { [Op.in]: types };
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

    const { Cab } = getModels();
    const results = await Cab.findAll(options);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get unique cab types
// @route   GET /api/cabs/types
// @access  Public
const getTypes = async (req, res) => {
  try {
    const { Cab } = getModels();
    const results = await Cab.findAll({
      attributes: ['type'],
      group: ['type'],
      raw: true,
    });
    res.json(results.map(r => r.type).filter(t => t != null && t.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get unique cab destinations
// @route   GET /api/cabs/destinations
// @access  Public
const getDestinations = async (req, res) => {
  try {
    const { Cab } = getModels();
    const results = await Cab.findAll({
      attributes: ['destination'],
      group: ['destination'],
      raw: true,
    });
    res.json(results.map(r => r.destination).filter(d => d != null && d.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single cab
// @route   GET /api/cabs/:id
// @access  Public
const getCabById = async (req, res) => {
  try {
    const { Cab } = getModels();
    const cab = await Cab.findByPk(req.params.id);
    if (cab) {
      res.json(cab);
    } else {
      res.status(404).json({ message: 'Cab not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a cab
// @route   POST /api/admin/cabs
// @access  Private/Admin
const createCab = async (req, res) => {
  try {
    const { title, seats, type, capacity, price, destination, thumbSrc: bodyThumbSrc, description } = req.body;
    let src = '';

    if (req.file) {
      src = `/uploads/${req.file.filename}`;
    } else {
      src = req.body.src || '';
    }

    if (!title || !src || !seats) {
      return res.status(400).json({ message: 'Title, seats, and image are required' });
    }

    const { Cab } = getModels();
    const createdCab = await Cab.create({
      title,
      type,
      capacity,
      price: price || 0,
      destination,
      seats,
      thumbSrc: bodyThumbSrc || '',
      src,
      description,
      isFeatured: req.body.isFeatured || false,
    });

    res.status(201).json(createdCab);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a cab
// @route   PUT /api/admin/cabs/:id
// @access  Private/Admin
const updateCab = async (req, res) => {
  try {
    const { Cab } = getModels();
    const cab = await Cab.findByPk(req.params.id);

    if (cab) {
      const updateData = {};
      if (req.body.title) updateData.title = req.body.title;
      if (req.body.type) updateData.type = req.body.type;
      if (req.body.capacity) updateData.capacity = req.body.capacity;
      if (req.body.price !== undefined) updateData.price = req.body.price;
      if (req.body.destination) updateData.destination = req.body.destination;
      if (req.body.seats) updateData.seats = req.body.seats;
      if (req.body.description) updateData.description = req.body.description;
      if (req.body.thumbSrc) updateData.thumbSrc = req.body.thumbSrc;
      if (req.body.isFeatured !== undefined) updateData.isFeatured = req.body.isFeatured;

      if (req.file) {
        updateData.src = `/uploads/${req.file.filename}`;
      } else if (req.body.src) {
        updateData.src = req.body.src;
      }

      await cab.update(updateData);
      res.json(cab);
    } else {
      res.status(404).json({ message: 'Cab not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a cab
// @route   DELETE /api/admin/cabs/:id
// @access  Private/Admin
const deleteCab = async (req, res) => {
  try {
    const { Cab } = getModels();
    const cab = await Cab.findByPk(req.params.id);

    if (cab) {
      await cab.destroy();
      res.json({ message: 'Cab removed' });
    } else {
      res.status(404).json({ message: 'Cab not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getCabs,
  getTypes,
  getDestinations,
  getCabById,
  createCab,
  updateCab,
  deleteCab
};
