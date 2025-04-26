import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updateProfile
} from '../controllers/userController.js';

const router = express.Router();

// Admin routes
router.route('/')
  .get(protect, getAllUsers);

router.route('/:id')
  .get(protect, getUser)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

// User profile routes
router.route('/profile')
  .patch(protect, updateProfile);

export default router; 