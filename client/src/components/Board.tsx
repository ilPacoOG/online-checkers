import { FC } from 'react';
import './Board.css';

const Board: FC = () => {
  const renderSquare = (row: number, col: number) => {
    const isBlack = (row + col) % 2 === 1;
    return (
      <div 
        key={`${row}-${col}`} 
        className={`square ${isBlack ? 'black' : 'white'}`}
      />
    );
  };

  const renderBoard = () => {
    const squares = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        squares.push(renderSquare(row, col));
      }
    }
    return squares;
  };

  return (
    <div className="board-container">
      {renderBoard()}
    </div>
  );
};

export default Board;