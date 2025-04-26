import express from 'express';
import authRoutes from './authRoutes.js';
import teamRoutes from './teamRoutes.js';
import hackathonRoutes from './hackathonRoutes.js';
import userRoutes from './userRoutes.js';
import competitionRoutes from './competitionRoutes.js';
import submissionRoutes from './submissionRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/teams', teamRoutes);
router.use('/hackathons', hackathonRoutes);
router.use('/users', userRoutes);
router.use('/competitions', competitionRoutes);
router.use('/submissions', submissionRoutes);

export default router; 