import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board';
import './Game.css';

const Game: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="game-container">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <h2>Game Status</h2>
        <div className="status">Red's Turn</div>
        <button className="back-button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Game;