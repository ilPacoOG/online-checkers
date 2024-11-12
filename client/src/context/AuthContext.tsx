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
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Don't remove 'users' from localStorage as we need to keep registered users
  };

  // Handle user registration
  const register = async (username: string, email: string, password: string) => {
    try {
      const newUser = {
        id: Date.now(),
        username,
        email
      };

      // Store user credentials for login
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({ ...newUser, password });
      localStorage.setItem('users', JSON.stringify(users));

      // Set current user
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(newUser));

      setUser(newUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    }
  };

  // Provide auth context to children components
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout,
      register
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