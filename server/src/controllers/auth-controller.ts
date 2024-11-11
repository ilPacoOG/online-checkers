import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginCredentials) => {
  // Debug log
  console.log('Processing login for email:', email);

  // Validate input
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // Find user
  const user = await User.findOne({
    where: { email }
  });

  if (!user) {
    console.log('User not found:', email);
    throw new Error('Invalid credentials');
  }

  // Verify password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    console.log('Invalid password for user:', email);
    throw new Error('Invalid credentials');
  }

  // Generate token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );

  // Return user data and token
  return {
    token,
    user: {
      id: user.id,
      email: user.email
    }
  };
}; 