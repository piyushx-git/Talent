import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import {
  createTeam,
  getAllTeams,
  getTeam,
  updateTeam,
  deleteTeam,
  updateTeamStatus,
  joinTeam
} from '../controllers/teamController.js';

const router = express.Router();

// Public routes
router.get('/', getAllTeams);
router.get('/:id', getTeam);

// Protected routes
router.use(protect);

// Student routes
router.post('/', restrictTo('student'), createTeam);
router.post('/:id/join', restrictTo('student'), joinTeam);

// Admin routes
router.patch('/:id/status', restrictTo('admin'), updateTeamStatus);
router.patch('/:id', restrictTo('admin'), updateTeam);
router.delete('/:id', restrictTo('admin'), deleteTeam);

export default router; 