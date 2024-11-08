import apiRoutes from './api/AI/index.js';
import express from 'express';
const router = express.Router();
import { authenticateToken } from '../middleware/auth.js';
import authRoutes from '../routes/api/users/auth-routes.js';


router.use('/auth', authRoutes);
router.use('/api', authenticateToken, apiRoutes);

export default router;
