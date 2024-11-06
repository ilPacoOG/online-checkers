import { FC } from 'react';
import { Board } from '../components/Board';

export const Game: FC = () => {
  return (
    <div className="game-container">
      <Board />
      <div className="game-info">
        {/* Game status, turn information, etc. */}
      </div>
    </div>
  );
};