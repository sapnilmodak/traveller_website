const express = require('express');
const router = express.Router();
const {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam
} = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.route('/').get(getTeams);
router.route('/:id').get(getTeamById);

router.route('/')
  .post(protect, createTeam);

router.route('/:id')
  .put(protect, updateTeam)
  .delete(protect, deleteTeam);

module.exports = router;
