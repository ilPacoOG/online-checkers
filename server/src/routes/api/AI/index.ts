import  aiRoutes from './aiRoutes.js';
import express from 'express';
const router = express.Router();

router.use('/aimove', aiRoutes );

export default router;
