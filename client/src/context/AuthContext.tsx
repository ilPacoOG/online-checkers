import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for the auth context
interface User {
  id: number;
  username: string;
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
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize state with values from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Effect to check authentication status when component mounts
  useEffect(() => {
    // Check for existing auth token
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Handle user login
  const login = async (email: string, password: string) => {
    try {
      // Get stored users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => 
        u.email === email && u.password === password
      );

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Remove password from user object before storing in state
      const { password: _, ...userWithoutPassword } = user;

      // Set auth state
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password');
    }
  };

  // Handle user logout
  const logout = () => {
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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 