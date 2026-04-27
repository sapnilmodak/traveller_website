const Hotel = require('../models/Hotel');

// @desc    Get all hotels
// @route   GET /api/hotels
// @access  Public
const getHotels = async (req, res) => {
  try {
    const { isFeatured, limit } = req.query;
    let query = {};
    if (isFeatured) query.isFeatured = true;

    let hotels = Hotel.find(query).sort({ createdAt: -1 });
    if (limit) {
      hotels = hotels.limit(parseInt(limit));
    }

    const results = await hotels;
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single hotel
// @route   GET /api/hotels/:id
// @access  Public
const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a hotel
// @route   POST /api/admin/hotels
// @access  Private/Admin
const createHotel = async (req, res) => {
  try {
    const { title, location, description } = req.body;
    let src = '';

    if (req.file) {
      src = `/uploads/${req.file.filename}`;
    } else {
      src = req.body.src || '';
    }

    if (!title || !src || !location) {
      return res.status(400).json({ message: 'Title, location, and image are required' });
    }

    const hotel = new Hotel({
      title,
      src,
      location,
      description,
      isFeatured: req.body.isFeatured || false,
    });

    const createdHotel = await hotel.save();
    res.status(201).json(createdHotel);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a hotel
// @route   PUT /api/admin/hotels/:id
// @access  Private/Admin
const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (hotel) {
      hotel.title = req.body.title || hotel.title;
      hotel.location = req.body.location || hotel.location;
      hotel.description = req.body.description || hotel.description;
      hotel.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : hotel.isFeatured;

      if (req.file) {
        hotel.src = `/uploads/${req.file.filename}`;
      } else if (req.body.src) {
        hotel.src = req.body.src;
      }

      const updatedHotel = await hotel.save();
      res.json(updatedHotel);
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a hotel
// @route   DELETE /api/admin/hotels/:id
// @access  Private/Admin
const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (hotel) {
      await hotel.deleteOne();
      res.json({ message: 'Hotel removed' });
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel
};
