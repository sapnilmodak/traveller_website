const Rental = require('../models/Rental');

// @desc    Get all rentals
// @route   GET /api/rentals
// @access  Public
const getRentals = async (req, res) => {
  try {
    const { isFeatured, type, destination, limit } = req.query;
    let query = {};
    if (isFeatured) query.isFeatured = true;
    if (type) {
      const types = type.split(',');
      query.type = { $in: types };
    }
    if (destination) {
      const destinations = destination.split(',');
      query.destination = { $in: destinations };
    }

    let rentals = Rental.find(query).sort({ createdAt: -1 });
    if (limit) {
      rentals = rentals.limit(parseInt(limit));
    }

    const results = await rentals;
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get unique rental types
// @route   GET /api/rentals/types
// @access  Public
const getTypes = async (req, res) => {
  try {
    const types = await Rental.distinct('type');
    res.json(types.filter(t => t != null && t.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get unique rental destinations
// @route   GET /api/rentals/destinations
// @access  Public
const getDestinations = async (req, res) => {
  try {
    const destinations = await Rental.distinct('destination');
    res.json(destinations.filter(d => d != null && d.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single rental
// @route   GET /api/rentals/:id
// @access  Public
const getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (rental) {
      res.json(rental);
    } else {
      res.status(404).json({ message: 'Rental not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a rental
// @route   POST /api/admin/rentals
// @access  Private/Admin
const createRental = async (req, res) => {
  try {
    const { title, engine, type, price, destination, thumbSrc: bodyThumbSrc, description } = req.body;
    let src = '';

    if (req.file) {
      src = `/uploads/${req.file.filename}`;
    } else {
      src = req.body.src || '';
    }

    if (!title || !src || !engine) {
      return res.status(400).json({ message: 'Title, engine, and image are required' });
    }

    const rental = new Rental({
      title,
      type,
      engine,
      price: price || 0,
      destination,
      thumbSrc: bodyThumbSrc || '',
      src,
      description,
      isFeatured: req.body.isFeatured || false,
    });

    const createdRental = await rental.save();
    res.status(201).json(createdRental);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a rental
// @route   PUT /api/admin/rentals/:id
// @access  Private/Admin
const updateRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);

    if (rental) {
      rental.title = req.body.title || rental.title;
      rental.type = req.body.type || rental.type;
      rental.engine = req.body.engine || rental.engine;
      rental.price = req.body.price !== undefined ? req.body.price : rental.price;
      rental.destination = req.body.destination || rental.destination;
      rental.description = req.body.description || rental.description;
      rental.thumbSrc = req.body.thumbSrc || rental.thumbSrc;
      rental.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : rental.isFeatured;

      if (req.file) {
        rental.src = `/uploads/${req.file.filename}`;
      } else if (req.body.src) {
        rental.src = req.body.src;
      }

      const updatedRental = await rental.save();
      res.json(updatedRental);
    } else {
      res.status(404).json({ message: 'Rental not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a rental
// @route   DELETE /api/admin/rentals/:id
// @access  Private/Admin
const deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);

    if (rental) {
      await rental.deleteOne();
      res.json({ message: 'Rental removed' });
    } else {
      res.status(404).json({ message: 'Rental not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getRentals,
  getTypes,
  getDestinations,
  getRentalById,
  createRental,
  updateRental,
  deleteRental
};
