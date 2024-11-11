// Import necessary dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

/**
 * Login Component
 * Handles user authentication and login form
 */
const Login: React.FC = () => {
  // State management for form fields and UI states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Hooks for navigation and authentication
  const navigate = useNavigate();
  const { login } = useAuth();

  /**
   * Handle form submission
   * Attempts to log in the user and redirects to game page on success
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form inputs
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Start loading state and clear any previous errors
      setIsLoading(true);
      setError(null);
      
      // Attempt login
      await login(email, password);
      console.log('Login successful');
      navigate('/game'); // Redirect to game page on success
      
    } catch (err) {
      // Handle login errors
      console.error('Login error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Unable to connect to server. Please try again.'
      );
    } finally {
      // Reset loading state regardless of outcome
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        {/* Error message display */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {/* Email input field */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        {/* Password input field */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        {/* Submit button with loading state */}
        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login; 