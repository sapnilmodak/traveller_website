const Team = require('../models/Team');

// @desc    Get all team members
// @route   GET /api/teams
// @access  Public
const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single team member
// @route   GET /api/teams/:id
// @access  Public
const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a team member
// @route   POST /api/admin/teams
// @access  Private/Admin
const createTeam = async (req, res) => {
  try {
    const { name, role, quote } = req.body;
    let src = '';

    if (req.file) {
      src = `/uploads/${req.file.filename}`;
    } else {
      src = req.body.src || '';
    }

    if (!name || !src || !role) {
      return res.status(400).json({ message: 'Name, role, and image are required' });
    }

    const team = new Team({
      name,
      src,
      role,
      quote
    });

    const createdTeam = await team.save();
    res.status(201).json(createdTeam);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a team member
// @route   PUT /api/admin/teams/:id
// @access  Private/Admin
const updateTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (team) {
      team.name = req.body.name || team.name;
      team.role = req.body.role || team.role;
      team.quote = req.body.quote || team.quote;

      if (req.file) {
        team.src = `/uploads/${req.file.filename}`;
      } else if (req.body.src) {
        team.src = req.body.src;
      }

      const updatedTeam = await team.save();
      res.json(updatedTeam);
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a team member
// @route   DELETE /api/admin/teams/:id
// @access  Private/Admin
const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (team) {
      await team.deleteOne();
      res.json({ message: 'Team member removed' });
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam
};
