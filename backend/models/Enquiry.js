const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  destination: { type: String },
  travelDate: { type: Date },
  days: { type: Number },
  persons: { type: Number },
  comments: { type: String },
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'Converted', 'Closed'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
