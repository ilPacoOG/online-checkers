import { Router, Request, Response } from 'express';
import { userRouter } from './api/users/user-routes.js';
import authRouter from './api/users/auth-routes.js';
import aiRoutes from './api/AI/aiRoutes.js';  // Import your AI routes here

const router = Router();

// Auth routes
router.use('/auth', authRouter);

// User routes
router.use('/users', userRouter);

// AI routes
router.use('/ai', aiRoutes); // This will make /api/ai accessible

// 404 handler
router.use('*', (_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

export default router;
