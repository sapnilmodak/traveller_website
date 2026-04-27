const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  engine: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  type: {
    type: String
  },
  thumbSrc: {
    type: String
  },
  destination: {
    type: String,
    trim: true
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

module.exports = mongoose.model('Rental', rentalSchema);
