const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    trim: true,
    default: 'Holiday Package'
  },
  url: {
    type: String,
    trim: true
  },
  thumbSrc: {
    type: String, // Path to local image or URL
    required: true
  },
  nights: {
    type: Number,
    required: true,
    default: 0
  },
  days: {
    type: Number,
    required: true,
    default: 1
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String
  },
  highlights: [{
    type: String
  }],
  inclusions: [{
    type: String
  }],
  exclusions: [{
    type: String
  }],
  itinerary: [{
    day: Number,
    title: String,
    description: String
  }],
  isFeatured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
