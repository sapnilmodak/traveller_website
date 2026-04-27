const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  src: {
    type: String, // Path to local image or URL
    required: true
  },
  category: {
    type: String,
    default: 'Adventure'
  },
  destination: {
    type: String,
    trim: true
  },
  description: {
    type: String
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
