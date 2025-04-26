import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import {
  createSubmission,
  getAllSubmissions,
  getSubmission,
  updateSubmission,
  deleteSubmission,
  updateSubmissionStatus
} from '../controllers/submissionController.js';

const router = express.Router();

// Public routes
router.get('/', getAllSubmissions);
router.get('/:id', getSubmission);

// Student routes
router.post('/', protect, restrictTo('student'), createSubmission);

// Organizer routes
router.patch('/:id/status', protect, restrictTo('organizer'), updateSubmissionStatus);

// Admin routes
router.patch('/:id', protect, restrictTo('admin'), updateSubmission);
router.delete('/:id', protect, restrictTo('admin'), deleteSubmission);

export default router; 