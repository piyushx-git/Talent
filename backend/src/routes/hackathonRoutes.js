import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import {
  getHackathons,
  getHackathon,
  createHackathon,
  updateHackathon,
  deleteHackathon,
  approveHackathon,
  rejectHackathon
} from '../controllers/hackathonController.js';

const router = express.Router();

// Public routes
router.get('/', getHackathons);
router.get('/:id', getHackathon);

// Protected routes
router.use(protect);

// Organizer routes
router.post('/', restrictTo('organizer'), createHackathon);
router.patch('/:id', restrictTo('organizer', 'admin'), updateHackathon);
router.delete('/:id', restrictTo('organizer', 'admin'), deleteHackathon);

// Admin routes
router.patch('/:id/approve', restrictTo('admin'), approveHackathon);
router.patch('/:id/reject', restrictTo('admin'), rejectHackathon);

export default router; 