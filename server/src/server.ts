import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import sequelize from './config/connection.js'; // Import Sequelize for database connection
import routes from './routes/index.js'; // Import your checkers game and AI routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Logging middleware for each request
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Primary routes for the application (e.g., Checkers Game and AI routes)
app.use('/api', routes); // Assumes routes includes all game and AI-related routes

// Authentication Mock Setup
const MOCK_USER = {
  id: 1,
  email: 'test@example.com',
  password: 'test12344321'
};

// Authentication routes
app.post('/api/users/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email format' });
  if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters long' });

  res.json({
    token: 'mock-token',
    user: { id: MOCK_USER.id, email }
  });
});

// Pexels Image Search Route
app.get('/api/pexels', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      headers: { Authorization: process.env.PEXELS_API_KEY },
      params: { query: req.query.query || 'space background', per_page: 25 }
    });
    res.json(response.data.photos);
  } catch (error) {
    console.error('Error fetching Pexels images:', error);
    res.status(500).json({ error: 'Failed to fetch images from Pexels' });
  }
});

// Error handling middleware for general server errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Sequelize Sync and Server Start
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((error: unknown) => {
  console.error('Failed to start server due to database error:', error);
  process.exit(1);
});
