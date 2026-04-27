const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  src: {
    type: String, // Path to local image or URL
    required: true
  },
  description: {
    type: String
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
