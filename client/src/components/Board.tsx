// Import necessary dependencies
import React, { useState } from 'react';
import { PieceType, Coordinates } from '../types/types';
import Square from './Square';
import './Board.css';

// Initialize the board with starting positions
const initializeBoard = (): PieceType[][] => [
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0]
];

const Board: React.FC = () => {
  // State for board and selected piece
  const [board, setBoard] = useState<PieceType[][]>(initializeBoard());
  const [selectedPiece, setSelectedPiece] = useState<Coordinates | null>(null);

  // Handle square click
  const handleSquareClick = (row: number, col: number) => {
    if (selectedPiece) {
      // Handle piece movement logic here
      setSelectedPiece(null);
    } else if (board[row][col] !== PieceType.Empty) {
      setSelectedPiece({ row, col });
    }
  };

  // Render board
  return (
    <div className="board-container">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((piece, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              piece={piece}
              isSelected={
                selectedPiece?.row === rowIndex && 
                selectedPiece?.col === colIndex
              }
              isBlack={(rowIndex + colIndex) % 2 === 1}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;