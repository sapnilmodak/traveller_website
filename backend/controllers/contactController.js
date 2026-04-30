const { getModels } = require('../models');

const createContact = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;
    if (!name || !phone || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const { Contact } = getModels();
    const savedContact = await Contact.create({ name, phone, email, subject, message });
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const { Contact } = getModels();
    const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { Contact } = getModels();
    const contact = await Contact.findByPk(req.params.id);
    if (contact) {
      await contact.update({ status: status || contact.status });
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { Contact } = getModels();
    const contact = await Contact.findByPk(req.params.id);
    if (contact) {
      await contact.destroy();
      res.json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { createContact, getContacts, updateContactStatus, deleteContact };
