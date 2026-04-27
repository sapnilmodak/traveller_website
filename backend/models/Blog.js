const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String, // Full HTML or Markdown content
    required: true
  },
  src: {
    type: String, // Path to local image or URL
    required: true
  },
  author: {
    type: String,
    default: 'Admin'
  },
  date: {
    type: String,
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
