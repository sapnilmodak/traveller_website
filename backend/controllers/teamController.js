const { getModels } = require('../models');

const getTeams = async (req, res) => {
  try {
    const { Team } = getModels();
    const teams = await Team.findAll({ order: [['createdAt', 'DESC']] });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getTeamById = async (req, res) => {
  try {
    const { Team } = getModels();
    const team = await Team.findByPk(req.params.id);
    if (team) { res.json(team); }
    else { res.status(404).json({ message: 'Team member not found' }); }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const createTeam = async (req, res) => {
  try {
    const { title, designation, sub_title, quote } = req.body;
    let teamSrc = '';
    if (req.file) { teamSrc = `/uploads/${req.file.filename}`; }
    else { teamSrc = req.body.teamSrc || ''; }
    if (!title || !teamSrc || !designation) {
      return res.status(400).json({ message: 'Title, designation, and image are required' });
    }
    const { Team } = getModels();
    const createdTeam = await Team.create({ title, teamSrc, designation, sub_title, quote });
    res.status(201).json(createdTeam);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { Team } = getModels();
    const team = await Team.findByPk(req.params.id);
    if (team) {
      const updateData = {};
      if (req.body.title) updateData.title = req.body.title;
      if (req.body.designation) updateData.designation = req.body.designation;
      if (req.body.sub_title) updateData.sub_title = req.body.sub_title;
      if (req.body.quote) updateData.quote = req.body.quote;
      if (req.file) { updateData.teamSrc = `/uploads/${req.file.filename}`; }
      else if (req.body.teamSrc) { updateData.teamSrc = req.body.teamSrc; }
      await team.update(updateData);
      res.json(team);
    } else { res.status(404).json({ message: 'Team member not found' }); }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { Team } = getModels();
    const team = await Team.findByPk(req.params.id);
    if (team) { await team.destroy(); res.json({ message: 'Team member removed' }); }
    else { res.status(404).json({ message: 'Team member not found' }); }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getTeams, getTeamById, createTeam, updateTeam, deleteTeam };
