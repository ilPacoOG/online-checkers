import apiRoutes from './api/AI/index.js';
import express from 'express';
const router = express.Router();

router.use('/api', apiRoutes);

export default router;
