import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Board from '../components/Board';
import './Game.css';

const Game: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="header-content">
          <h1>Checkers Game</h1>
          <span className="user-email">Logged in as: {user?.email}</span>
        </div>
        <div className="header-buttons">
          <Link to="/rules" className="rules-button">Rules</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>
      <div className="game-content">
        <div className="game-board">
          <Board />
        </div>
      </div>
    </div>
  );
};

export default Game;