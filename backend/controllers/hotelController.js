const { getModels } = require('../models');

const getHotels = async (req, res) => {
  try {
    const { isFeatured, limit } = req.query;
    const where = {};
    if (isFeatured) where.isFeatured = true;
    const options = { where, order: [['createdAt', 'DESC']] };
    if (limit) options.limit = parseInt(limit);
    const { Hotel } = getModels();
    const results = await Hotel.findAll(options);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getHotelById = async (req, res) => {
  try {
    const { Hotel } = getModels();
    const hotel = await Hotel.findByPk(req.params.id);
    if (hotel) { res.json(hotel); }
    else { res.status(404).json({ message: 'Hotel not found' }); }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const createHotel = async (req, res) => {
  try {
    const { title, location, description } = req.body;
    let src = '';
    if (req.file) { src = `/uploads/${req.file.filename}`; }
    else { src = req.body.src || ''; }
    if (!title || !src || !location) {
      return res.status(400).json({ message: 'Title, location, and image are required' });
    }
    const { Hotel } = getModels();
    const createdHotel = await Hotel.create({ title, src, location, description, isFeatured: req.body.isFeatured || false });
    res.status(201).json(createdHotel);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const updateHotel = async (req, res) => {
  try {
    const { Hotel } = getModels();
    const hotel = await Hotel.findByPk(req.params.id);
    if (hotel) {
      const updateData = {};
      if (req.body.title) updateData.title = req.body.title;
      if (req.body.location) updateData.location = req.body.location;
      if (req.body.description) updateData.description = req.body.description;
      if (req.body.isFeatured !== undefined) updateData.isFeatured = req.body.isFeatured;
      if (req.file) { updateData.src = `/uploads/${req.file.filename}`; }
      else if (req.body.src) { updateData.src = req.body.src; }
      await hotel.update(updateData);
      res.json(hotel);
    } else { res.status(404).json({ message: 'Hotel not found' }); }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const deleteHotel = async (req, res) => {
  try {
    const { Hotel } = getModels();
    const hotel = await Hotel.findByPk(req.params.id);
    if (hotel) { await hotel.destroy(); res.json({ message: 'Hotel removed' }); }
    else { res.status(404).json({ message: 'Hotel not found' }); }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getHotels, getHotelById, createHotel, updateHotel, deleteHotel };
