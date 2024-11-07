// Import necessary dependencies
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board';
import './Game.css';

// Game component - handles the game page layout and navigation
const Game: FC = () => {
  // Hook for navigation between pages
  const navigate = useNavigate();

  return (
    // Main game container
    <div className="game-container">
      {/* Game board section */}
      <div className="game-board">
        <Board />
      </div>

      {/* Game information and controls panel */}
      <div className="game-info">
        <h2>Game Status</h2>
        {/* Current player turn indicator */}
        <div className="status">Player's Turn</div>
        {/* Navigation button to return to home page */}
        <button className="back-button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Game;