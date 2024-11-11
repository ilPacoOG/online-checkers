/**
 * API Service for backend communication
 * Handles all HTTP requests to the server
 */

import axios from 'axios';

// Base URL for API endpoints
const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Authentication API calls
 */
export const authAPI = {
  /**
   * Login user
   * @param email User's email
   * @param password User's password
   * @returns User data and token
   */
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  /**
   * Register new user
   * @param email User's email
   * @param password User's password
   * @returns User data and token
   */
  register: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { email, password });
      return response.data;
    } catch (error) {
      throw new Error('Registration failed');
    }
  },
};

/**
 * Game API calls
 */
export const gameAPI = {
  /**
   * Save game state
   * @param gameState Current state of the game
   * @returns Saved game data
   */
  saveGame: async (gameState: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/games/save', gameState, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to save game');
    }
  },

  /**
   * Load saved game
   * @param gameId ID of the game to load
   * @returns Game state data
   */
  loadGame: async (gameId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/games/${gameId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to load game');
    }
  },

  /**
   * Get user's game history
   * @returns Array of previous games
   */
  getGameHistory: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/games/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to load game history');
    }
  }
};

/**
 * User API calls
 */
export const userAPI = {
  /**
   * Login user
   * @param credentials User login credentials
   */
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch('/api/users/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Get all users
   */
  getAllUsers: async () => {
    try {
      const response = await fetch('/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      return await response.json();
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  },

  /**
   * Create new user
   * @param userData User registration data
   */
  createUser: async (userData: { email: string; password: string }) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      return await response.json();
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  },

  /**
   * Update user
   * @param id User ID
   * @param userData Updated user data
   */
  updateUser: async (id: string, userData: { email: string; password: string }) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      return await response.json();
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  },

  /**
   * Delete user
   * @param id User ID
   */
  deleteUser: async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  },
};

// Add interceptor for token handling
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add interceptor for response handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default {
  auth: authAPI,
  game: gameAPI,
  user: userAPI
}; 