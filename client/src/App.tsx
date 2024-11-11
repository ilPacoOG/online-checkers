// Import necessary dependencies
import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Game from './pages/Game';
import Rules from './pages/Rules';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

/**
 * Main Application Component
 * Sets up routing and authentication context
 */
const App: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/game" 
              element={
                <ProtectedRoute>
                  <Game />
                </ProtectedRoute>
              } 
            />
            <Route path="/rules" element={<Rules />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;