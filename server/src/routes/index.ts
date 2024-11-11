import apiRoutes from './api/users/index.js';
import express from 'express';

// import { authenticateToken } from '../middleware/auth.js';
import authRoutes from '../routes/api/users/auth-routes.js';
import aiRoutes from './api/AI/aiRoutes.js';    // AI-related routes
import moveRoutes from './api/AI/move.js';      // Game move-related routes
const router = express.Router();

// Authentication routes
router.use('/auth', authRoutes);

// User routes, keeping the current setup intact
router.use('/api', apiRoutes);

// AI-specific routes (e.g., /api/ai/move)
router.use('/api/ai', aiRoutes);

// Game move routes (e.g., /api/games/:gameId/move)
router.use('/api/games', moveRoutes);

export default router;
