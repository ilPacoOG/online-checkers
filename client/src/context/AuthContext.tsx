import React, { createContext, useContext, useState } from 'react';
import { authAPI } from '../services/apiService';

/**
 * Interface defining the shape of the authentication context
 */
interface AuthContextType {
  isAuthenticated: boolean;      // Flag indicating if user is logged in
  user: User | null;             // Current user data or null if not logged in
  login: (email: string, password: string) => Promise<void>;  // Login function
  logout: () => void;            // Logout function
}

/**
 * Interface defining the shape of a user object
 */
interface User {
  email: string;    // User's email address
  id: string;       // Unique user identifier
}

// Create the authentication context with undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider Component
 * Wraps the application and provides authentication state and methods
 * @param children - Child components to be wrapped
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for tracking authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State for storing current user data
  const [user, setUser] = useState<User | null>(null);

  /**
   * Handles user login
   * @param email - User's email
   * @param password - User's password
   * @throws Error if login fails
   */
  const login = async (email: string, password: string) => {
    try {
      // Attempt to login using the auth API
      const response = await authAPI.login(email, password);
      // Store authentication token in local storage
      localStorage.setItem('token', response.token);
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(response.user));
      // Update user state
      setUser(response.user);
      // Update authentication state
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  /**
   * Handles user logout
   * Clears all authentication data and resets state
   */
  const logout = () => {
    // Remove authentication data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Reset user state to null
    setUser(null);
    // Reset authentication state to false
    setIsAuthenticated(false);
  };

  // Provide authentication context to children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook for accessing authentication context
 * @returns Authentication context value
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Ensure hook is used within AuthProvider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 