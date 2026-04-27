const Contact = require('../models/Contact');

// @desc    Submit a new contact message
// @route   POST /api/contacts
// @access  Public
const createContact = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    if (!name || !phone || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contact = new Contact({
      name,
      phone,
      email,
      subject,
      message
    });

    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/admin/contacts
// @access  Private/Admin
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update contact status
// @route   PUT /api/admin/contacts/:id/status
// @access  Private/Admin
const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (contact) {
      contact.status = status || contact.status;
      const updatedContact = await contact.save();
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createContact,
  getContacts,
  updateContactStatus
};
