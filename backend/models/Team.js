const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true
  },
  sub_title: {
    type: String
  },
  teamSrc: {
    type: String, // Path to local image or URL
    required: true
  },
  quote: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
