const API_URL = 'http://localhost:3002';

// Game related types
interface GameState {
  board: number[][];
  currentPlayer: string;
  // Add other game state properties as needed
}

interface GameMove {
  from: { row: number; col: number };
  to: { row: number; col: number };
}

// Types
interface User {
  id: number;
  email: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

// Test connection function
export const testConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/test`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Connection test failed:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  // Handle user login
  login: async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    try {
      // Make POST request to login endpoint
      const response = await fetch(`${API_URL}/api/users/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      // Handle non-200 responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store authentication data in localStorage for persistence
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Handle user logout
  logout: () => {
    // Clear all auth-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check if user is currently authenticated
  isAuthenticated: (): boolean => {
    // Check if token exists in localStorage
    return !!localStorage.getItem('token');
  },

  // Retrieve current user data
  getCurrentUser: (): User | null => {
    // Get and parse user data from localStorage
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  register: async (credentials: { 
    username: string; 
    email: string; 
    password: string; 
  }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Store user data
    const user = {
      id: Date.now(),
      username: credentials.username,
      email: credentials.email
    };

    const token = 'mock-jwt-token-' + Date.now();

    return { token, user };
  }
};

// Game API
export const gameAPI = {
  // Get current game state
  getGameState: async () => {
    try {
      const response = await fetch(`${API_URL}/api/game/state`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch game state');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Get game state error:', error);
      throw error;
    }
  },

  // Make a move
  makeMove: async (move: GameMove) => {
    try {
      const response = await fetch(`${API_URL}/api/game/move`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(move)
      });
      
      if (!response.ok) {
        throw new Error('Invalid move');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Make move error:', error);
      throw error;
    }
  },

  // Save game state
  saveGame: async (gameState: GameState) => {
    try {
      const response = await fetch(`${API_URL}/api/game/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(gameState)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save game');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Save game error:', error);
      throw error;
    }
  }
}; 