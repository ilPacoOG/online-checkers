import { FC } from 'react';
import './Board.css';

type PieceType = 'red' | 'black' | null;

const Board: FC = () => {
  // Initial setup of the board with pieces
  const initialBoard: PieceType[][] = Array(8).fill(null).map((_, row) => {
    return Array(8).fill(null).map((_, col) => {
      if ((row + col) % 2 === 1) {
        if (row < 3) return 'black';
        if (row > 4) return 'red';
      }
      return null;
    });
  });

  const renderPiece = (piece: PieceType) => {
    if (!piece) return null;
    return <div className={`piece ${piece}`} />;
  };

  const renderSquare = (row: number, col: number) => {
    const isBlack = (row + col) % 2 === 1;
    const piece = initialBoard[row][col];
    
    return (
      <div 
        key={`${row}-${col}`} 
        className={`square ${isBlack ? 'black' : 'white'}`}
      >
        {renderPiece(piece)}
      </div>
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