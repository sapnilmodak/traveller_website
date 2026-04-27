const Package = require('../models/Package');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
const getPackages = async (req, res) => {
  try {
    const { isFeatured, destination, category, limit } = req.query;
    let query = {};
    if (isFeatured) query.isFeatured = true;
    
    if (destination) {
      const destinations = destination.split(',').map(d => new RegExp(`^${d.trim()}$`, 'i'));
      query.destination = { $in: destinations };
    }

    if (category) {
      const categories = category.split(',');
      query.category = { $in: categories };
    }

    let packages = Package.find(query).sort({ createdAt: -1 });
    if (limit) {
      packages = packages.limit(parseInt(limit));
    }

    const results = await packages;
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get unique categories
// @route   GET /api/packages/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Package.distinct('category');
    res.json(categories.filter(c => c != null && c.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get unique destinations
// @route   GET /api/packages/destinations
// @access  Public
const getDestinations = async (req, res) => {
  try {
    const destinations = await Package.distinct('destination');
    res.json(destinations.filter(d => d != null && d.trim() !== ''));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single package
// @route   GET /api/packages/:id
// @access  Public
const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (pkg) {
      res.json(pkg);
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a package
// @route   POST /api/admin/packages
// @access  Private/Admin
const createPackage = async (req, res) => {
  try {
    const { title, destination, category, url, nights, days, price, description, highlights, inclusions, exclusions, itinerary } = req.body;
    let thumbSrc = '';

    if (req.file) {
      thumbSrc = `/uploads/${req.file.filename}`;
    } else {
      // Allow passing a URL directly if no file is uploaded
      thumbSrc = req.body.thumbSrc || '';
    }

    if (!title || !destination || !thumbSrc) {
      return res.status(400).json({ message: 'Title, destination, and image are required' });
    }

    const pkg = new Package({
      title,
      thumbSrc,
      url,
      destination,
      category: category || 'Holiday Package',
      nights: nights || 0,
      days: days || 1,
      price: price || 0,
      description,
      highlights: highlights || [],
      inclusions: inclusions || [],
      exclusions: exclusions || [],
      itinerary: itinerary || [],
      isFeatured: req.body.isFeatured || false,
    });

    const createdPackage = await pkg.save();
    res.status(201).json(createdPackage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a package
// @route   PUT /api/admin/packages/:id
// @access  Private/Admin
const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (pkg) {
      pkg.title = req.body.title || pkg.title;
      pkg.destination = req.body.destination || pkg.destination;
      pkg.category = req.body.category || pkg.category;
      pkg.url = req.body.url !== undefined ? req.body.url : pkg.url;
      pkg.nights = req.body.nights !== undefined ? req.body.nights : pkg.nights;
      pkg.days = req.body.days !== undefined ? req.body.days : pkg.days;
      pkg.price = req.body.price !== undefined ? req.body.price : pkg.price;
      pkg.description = req.body.description || pkg.description;
      pkg.highlights = req.body.highlights !== undefined ? req.body.highlights : pkg.highlights;
      pkg.inclusions = req.body.inclusions !== undefined ? req.body.inclusions : pkg.inclusions;
      pkg.exclusions = req.body.exclusions !== undefined ? req.body.exclusions : pkg.exclusions;
      pkg.itinerary = req.body.itinerary !== undefined ? req.body.itinerary : pkg.itinerary;
      pkg.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : pkg.isFeatured;

      if (req.file) {
        pkg.thumbSrc = `/uploads/${req.file.filename}`;
      } else if (req.body.thumbSrc) {
        pkg.thumbSrc = req.body.thumbSrc;
      }

      const updatedPackage = await pkg.save();
      res.json(updatedPackage);
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a package
// @route   DELETE /api/admin/packages/:id
// @access  Private/Admin
const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (pkg) {
      await pkg.deleteOne();
      res.json({ message: 'Package removed' });
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getPackages,
  getDestinations,
  getCategories,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
};
