import React, { useState } from 'react';
import { authAPI } from '../services/apiService';

const TestConnection: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  const testServer = async () => {
    try {
      setStatus('Testing connection...');
      const response = await fetch('http://localhost:3001/test');
      const data = await response.json();
      setStatus(`Server response: ${data.message}`);
      setError('');
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Connection error:', err);
    }
  };

  const testLogin = async () => {
    try {
      setStatus('Testing login...');
      const response = await authAPI.login({
        email: 'test@example.com',
        password: 'password123'
      });
      setStatus('Login test successful');
      console.log('Login response:', response);
      setError('');
    } catch (err) {
      setError('Login test failed');
      console.error('Login error:', err);
    }
  };

  return (
    <div style={{ padding: '20px', margin: '20px', border: '1px solid #ccc' }}>
      <h3>Connection Tester</h3>
      <button onClick={testServer}>Test Server Connection</button>
      <button onClick={testLogin} style={{ marginLeft: '10px' }}>Test Login</button>
      {status && <p>Status: {status}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default TestConnection;