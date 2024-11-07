import { FC, useState } from 'react';
import Square from './Square';
import './Board.css';

// Define types for pieces
type PieceType = 'red' | 'black' | null;

const Board: FC = () => {
  // Initialize board state with starting piece positions
  const [board, setBoard] = useState<PieceType[][]>(
    Array(8).fill(null).map((_, row) => {
      return Array(8).fill(null).map((_, col) => {
        if ((row + col) % 2 === 1) {  // Only place pieces on black squares
          if (row < 3) return 'black';  // Black pieces at top
          if (row > 4) return 'red';    // Red pieces at bottom
        }
        return null;  // No piece on this square
      });
    })
  );

  // Render a single square with its piece
  const renderSquare = (row: number, col: number) => {
    const isBlack = (row + col) % 2 === 1;  // Determine square color
    const piece = board[row][col];  // Get piece at this position
    
    return (
      <Square 
        key={`${row}-${col}`}
        isBlack={isBlack}
        piece={piece}
      />
    );
  };

  // Render the entire board
  const renderBoard = () => {
    const squares = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        squares.push(renderSquare(row, col));
      }
    }
    return squares;
  };

  // Return the board container with all squares
  return (
    <div className="board-container">
      {renderBoard()}
    </div>
  );
};

export default Board;