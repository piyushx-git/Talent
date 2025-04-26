import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import {
  getAllTeams,
  getTeam,
  updateTeam,
  deleteTeam,
  updateTeamStatus
} from '../controllers/teamController.js';
import {
  getAllCompetitions,
  getCompetition,
  createCompetition,
  updateCompetition,
  deleteCompetition,
  updateCompetitionStatus
} from '../controllers/competitionController.js';

const router = express.Router();

// Apply protect middleware to all routes
router.use(protect);

// User management routes
router.get('/users', restrictTo('admin'), getAllUsers);
router.get('/users/:id', restrictTo('admin'), getUser);
router.patch('/users/:id', restrictTo('admin'), updateUser);
router.delete('/users/:id', restrictTo('admin'), deleteUser);

// Team management routes
router.get('/teams', restrictTo('admin'), getAllTeams);
router.get('/teams/:id', restrictTo('admin'), getTeam);
router.patch('/teams/:id', restrictTo('admin'), updateTeam);
router.delete('/teams/:id', restrictTo('admin'), deleteTeam);
router.patch('/teams/:id/status', restrictTo('admin'), updateTeamStatus);

// Competition management routes
router.get('/competitions', restrictTo('admin'), getAllCompetitions);
router.get('/competitions/:id', restrictTo('admin'), getCompetition);
router.patch('/competitions/:id', restrictTo('admin'), updateCompetition);
router.delete('/competitions/:id', restrictTo('admin'), deleteCompetition);
router.patch('/competitions/:id/status', restrictTo('admin'), updateCompetitionStatus);

export default router; 