const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');

// POST /api/upload
// @desc Upload a file
// @access Private (Admin)
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  // Return the path that can be used to access the file
  // e.g. /uploads/image-12345.jpg
  const filePath = `/uploads/${req.file.filename}`;
  res.status(201).json({
    message: 'File uploaded successfully',
    url: filePath
  });
});

module.exports = router;
