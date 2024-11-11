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
   * Get user profile
   * @returns User profile data
   */
  getProfile: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to load profile');
    }
  },

  /**
   * Update user profile
   * @param userData Updated user data
   * @returns Updated profile data
   */
  updateProfile: async (userData: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put('/users/profile', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  }
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