const Cab = require('../models/Cab');

// @desc    Get all cabs
// @route   GET /api/cabs
// @access  Public
const getCabs = async (req, res) => {
  try {
    const { isFeatured, type, destination, limit } = req.query;
    let query = {};
    if (isFeatured) query.isFeatured = true;
    if (type) {
      const types = type.split(',');
      query.type = { $in: types };
    }
    if (destination) {
      const destinations = destination.split(',').map(d => new RegExp(`^${d.trim()}$`, 'i'));
      query.destination = { $in: destinations };
    }

    let cabs = Cab.find(query).sort({ createdAt: -1 });
    if (limit) {
      cabs = cabs.limit(parseInt(limit));
    }

    const results = await cabs;
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
    const types = await Cab.distinct('type');
    res.json(types.filter(t => t != null && t.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get unique cab destinations
// @route   GET /api/cabs/destinations
// @access  Public
const getDestinations = async (req, res) => {
  try {
    const destinations = await Cab.distinct('destination');
    res.json(destinations.filter(d => d != null && d.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single cab
// @route   GET /api/cabs/:id
// @access  Public
const getCabById = async (req, res) => {
  try {
    const cab = await Cab.findById(req.params.id);
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

    const cab = new Cab({
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

    const createdCab = await cab.save();
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
    const cab = await Cab.findById(req.params.id);

    if (cab) {
      cab.title = req.body.title || cab.title;
      cab.type = req.body.type || cab.type;
      cab.capacity = req.body.capacity || cab.capacity;
      cab.price = req.body.price !== undefined ? req.body.price : cab.price;
      cab.destination = req.body.destination || cab.destination;
      cab.seats = req.body.seats || cab.seats;
      cab.description = req.body.description || cab.description;
      cab.thumbSrc = req.body.thumbSrc || cab.thumbSrc;
      cab.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : cab.isFeatured;

      if (req.file) {
        cab.src = `/uploads/${req.file.filename}`;
      } else if (req.body.src) {
        cab.src = req.body.src;
      }

      const updatedCab = await cab.save();
      res.json(updatedCab);
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
    const cab = await Cab.findById(req.params.id);

    if (cab) {
      await cab.deleteOne();
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
