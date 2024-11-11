import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/apiService';

// Define types for the auth context
interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider component that wraps the app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with values from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => authAPI.isAuthenticated());
  const [user, setUser] = useState<User | null>(() => authAPI.getCurrentUser());

  // Effect to check authentication status when component mounts
  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const savedUser = authAPI.getCurrentUser();
    
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(savedUser);
    }
  }, []);

  // Handle user login
  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error in context:', error);
      throw error;
    }
  };

  // Handle user logout
  const logout = () => {
    authAPI.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Provide auth context to children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 