import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import {
  createCompetition,
  getAllCompetitions,
  getCompetition,
  updateCompetition,
  deleteCompetition,
  updateCompetitionStatus,
  registerForCompetition,
  getOrganizerCompetitions
} from '../controllers/competitionController.js';

const router = express.Router();

// Public routes
router.get('/', getAllCompetitions);
router.get('/:id', getCompetition);

// Protected routes
router.use(protect);

// Student routes
router.post('/:id/register', restrictTo('student'), registerForCompetition);

// Organizer routes
router.get('/organizer', protect, restrictTo('organizer'), getOrganizerCompetitions);
router.post('/', restrictTo('organizer'), createCompetition);
router.patch('/:id', restrictTo('organizer', 'admin'), updateCompetition);
router.delete('/:id', restrictTo('organizer', 'admin'), deleteCompetition);

// Admin routes
router.patch('/:id/status', restrictTo('admin'), updateCompetitionStatus);

export default router; 