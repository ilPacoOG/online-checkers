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
  register: (username: string, email: string, password: string) => Promise<void>;
  createUser: (username: string, email: string, password: string) => Promise<void>;
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

  // Handle user registration
  const register = async (username: string, email: string, password: string) => {
    try {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: any) => u.email === email);
      
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        username,
        email,
        password // In a real app, this should be hashed
      };

      // Add to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Auto login after creation
      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('token', 'mock-jwt-token');

      setUser(userWithoutPassword);
      setIsAuthenticated(true);

      return userWithoutPassword;
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  };

  // Handle user creation
  const createUser = async (username: string, email: string, password: string) => {
    try {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: any) => u.email === email);
      
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        username,
        email,
        password // In a real app, this should be hashed
      };

      // Add to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Auto login after creation
      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('token', 'mock-jwt-token');

      setUser(userWithoutPassword);
      setIsAuthenticated(true);

      return userWithoutPassword;
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  };

  // Provide auth context to children components
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout,
      register,
      createUser
    }}>
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