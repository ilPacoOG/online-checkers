import apiRoutes from './api/users/index.js';
import express from 'express';
const router = express.Router();
import { authenticateToken } from '../middleware/auth.js';
import authRoutes from '../routes/api/users/auth-routes.js';


router.use('/auth', authenticateToken, authRoutes);
router.use('/api', apiRoutes);

export default router;
