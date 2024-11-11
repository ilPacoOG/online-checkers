import express from 'express';
import aiRoutes from './aiRoutes';
import moveRoutes from './move';

const router = express.Router();

// Use routes from aiRoutes.ts and move.ts
router.use('/ai', aiRoutes);  // e.g., /api/ai/move
router.use('/games', moveRoutes);  // e.g., /api/games/:gameId/move

export default router;

