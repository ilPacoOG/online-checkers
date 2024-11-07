// Import necessary dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// Login component definition
const Login: React.FC = () => {
  // State management for form inputs and error handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Hook for navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    
    // Basic form validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // TODO: Add actual authentication logic here
      console.log('Login attempted with:', { email, password });
      
      // Temporary: Navigate to game on "successful" login
      navigate('/game');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    // Main container for centering the login form
    <div className="login-container">
      {/* Login form card */}
      <div className="login-box">
        <h2>Login to Play Checkers</h2>
        
        {/* Conditional error message display */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Email input group */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password input group */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Sign up link */}
        <div className="login-footer">
          <p>Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login; 