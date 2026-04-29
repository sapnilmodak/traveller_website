const { getModels } = require('../models');

const createEnquiry = async (req, res) => {
  try {
    const { name, phone, email, destination, travelDate, days, persons, comments } = req.body;
    if (!name || !phone || !email) {
      return res.status(400).json({ message: 'Name, phone, and email are required' });
    }
    const { Enquiry } = getModels();
    const savedEnquiry = await Enquiry.create({ name, phone, email, destination, travelDate, days, persons, comments });
    res.status(201).json(savedEnquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getEnquiries = async (req, res) => {
  try {
    const { Enquiry } = getModels();
    const enquiries = await Enquiry.findAll({ order: [['createdAt', 'DESC']] });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { Enquiry } = getModels();
    const enquiry = await Enquiry.findByPk(req.params.id);
    if (enquiry) {
      await enquiry.update({ status: status || enquiry.status });
      res.json(enquiry);
    } else {
      res.status(404).json({ message: 'Enquiry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { createEnquiry, getEnquiries, updateEnquiryStatus };
