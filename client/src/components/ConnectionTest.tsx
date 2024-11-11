import React, { useEffect, useState } from 'react';
import { testConnection } from '../services/apiService';

const ConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Testing connection...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const result = await testConnection();
        setStatus(`Connected! ${result.message}`);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Connection failed');
        setStatus('Failed to connect');
      }
    };

    checkConnection();
  }, []);

  return (
    <div style={{ padding: '20px', margin: '20px', border: '1px solid #ccc' }}>
      <h3>Server Connection Status:</h3>
      <p>{status}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ConnectionTest; 