const Enquiry = require('../models/Enquiry');

// @desc    Submit a new enquiry
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res) => {
  try {
    const { name, phone, email, destination, travelDate, days, persons, comments } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ message: 'Name, phone, and email are required' });
    }

    const enquiry = new Enquiry({
      name,
      phone,
      email,
      destination,
      travelDate,
      days,
      persons,
      comments
    });

    const savedEnquiry = await enquiry.save();
    res.status(201).json(savedEnquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all enquiries
// @route   GET /api/admin/enquiries
// @access  Private/Admin
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update enquiry status
// @route   PUT /api/admin/enquiries/:id/status
// @access  Private/Admin
const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (enquiry) {
      enquiry.status = status || enquiry.status;
      const updatedEnquiry = await enquiry.save();
      res.json(updatedEnquiry);
    } else {
      res.status(404).json({ message: 'Enquiry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus
};
