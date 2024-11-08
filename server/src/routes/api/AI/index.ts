import express from 'express';
import aiRoutes from './move.js';

const router = express.Router();

// Register the AI routes under /api/ai
router.use('/api/ai', aiRoutes);

export default router;
