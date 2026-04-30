const { Op } = require('sequelize');
const { getModels } = require('../models');

const getRentals = async (req, res) => {
  try {
    const { isFeatured, type, destination, limit } = req.query;
    const where = {};
    if (isFeatured) where.isFeatured = true;
    if (type) { where.type = { [Op.in]: type.split(',') }; }
    if (destination) { where.destination = { [Op.in]: destination.split(',') }; }
    const options = { where, order: [['createdAt', 'DESC']] };
    if (limit) options.limit = parseInt(limit);
    const { Rental } = getModels();
    const results = await Rental.findAll(options);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getTypes = async (req, res) => {
  try {
    const { Rental } = getModels();
    const results = await Rental.findAll({ attributes: ['type'], group: ['type'], raw: true });
    res.json(results.map(r => r.type).filter(t => t != null && t.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getDestinations = async (req, res) => {
  try {
    const { Rental } = getModels();
    const results = await Rental.findAll({ attributes: ['destination'], group: ['destination'], raw: true });
    res.json(results.map(r => r.destination).filter(d => d != null && d.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getRentalById = async (req, res) => {
  try {
    const { Rental } = getModels();
    const rental = await Rental.findByPk(req.params.id);
    if (rental) { res.json(rental); }
    else { res.status(404).json({ message: 'Rental not found' }); }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const createRental = async (req, res) => {
  try {
    const { title, engine, type, price, destination, thumbSrc: bodyThumbSrc, description, images } = req.body;
    let src = '';
    if (req.file) { src = `/uploads/${req.file.filename}`; }
    else { src = req.body.src || ''; }
    if (!title || !src || !engine) {
      return res.status(400).json({ message: 'Title, engine, and image are required' });
    }
    const { Rental } = getModels();
    const createdRental = await Rental.create({
      title, type, engine, price: price || 0, destination,
      thumbSrc: bodyThumbSrc || '', src, description, isFeatured: req.body.isFeatured || false,
      images: images || [],
    });
    res.status(201).json(createdRental);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const updateRental = async (req, res) => {
  try {
    const { Rental } = getModels();
    const rental = await Rental.findByPk(req.params.id);
    if (rental) {
      const updateData = {};
      if (req.body.title) updateData.title = req.body.title;
      if (req.body.type) updateData.type = req.body.type;
      if (req.body.engine) updateData.engine = req.body.engine;
      if (req.body.price !== undefined) updateData.price = req.body.price;
      if (req.body.destination) updateData.destination = req.body.destination;
      if (req.body.description) updateData.description = req.body.description;
      if (req.body.thumbSrc) updateData.thumbSrc = req.body.thumbSrc;
      if (req.body.isFeatured !== undefined) updateData.isFeatured = req.body.isFeatured;
      if (req.body.images !== undefined) updateData.images = req.body.images;
      if (req.file) { updateData.src = `/uploads/${req.file.filename}`; }
      else if (req.body.src) { updateData.src = req.body.src; }
      await rental.update(updateData);
      res.json(rental);
    } else { res.status(404).json({ message: 'Rental not found' }); }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const deleteRental = async (req, res) => {
  try {
    const { Rental } = getModels();
    const rental = await Rental.findByPk(req.params.id);
    if (rental) { await rental.destroy(); res.json({ message: 'Rental removed' }); }
    else { res.status(404).json({ message: 'Rental not found' }); }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getRentals, getTypes, getDestinations, getRentalById, createRental, updateRental, deleteRental };
