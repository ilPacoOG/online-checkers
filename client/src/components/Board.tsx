import React, { useState } from 'react';
import { PieceType, Coordinates } from '../types/types';
import { 
  isValidMove, 
  executeMove, 
  isCaptureMove, 
  executeCapture, 
  promoteToKing 
} from '../services/gameService';
import Square from './Square';
import './Board.css';

// Initialize the board with starting positions
const initializeBoard = (): PieceType[][] => [
  [0, 1, 0, 1, 0, 1, 0, 1], // Top row (Black pieces)
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0], // Empty middle rows
  [0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0]  // Bottom row (Red pieces)
];

const Board: React.FC = () => {
  // State for the board and selected piece
  const [board, setBoard] = useState<PieceType[][]>(initializeBoard());
  const [selectedPiece, setSelectedPiece] = useState<Coordinates | null>(null);

  // Handle clicking on a square
  const handleSquareClick = (row: number, col: number) => {
    const selectedSquare = { row, col };

    if (selectedPiece) {
      // If a piece is already selected, try to move it
      if (isCaptureMove(board, selectedPiece, selectedSquare)) {
        // Execute capture move
        const newBoard = executeCapture(board, selectedPiece, selectedSquare);
        setBoard(promoteToKing(newBoard, selectedSquare));
      } else if (isValidMove(board, selectedPiece, selectedSquare)) {
        // Execute regular move
        const newBoard = executeMove(board, selectedPiece, selectedSquare);
        setBoard(promoteToKing(newBoard, selectedSquare));
      } else {
        console.log("Invalid move");
      }
      
      // Clear selection after move attempt
      setSelectedPiece(null);
    } else {
      // If no piece is selected and clicked square has a piece, select it
      if (board[row][col] !== PieceType.Empty) {
        setSelectedPiece(selectedSquare);
      }
    }
  };

  // Render the board
  return (
    <div className="board-container">
      {board.map((row, rowIndex) => (
        row.map((piece, colIndex) => (
          <Square
            key={`${rowIndex}-${colIndex}`}
            pieceType={piece}
            row={rowIndex}
            col={colIndex}
            className={`square ${((rowIndex + colIndex) % 2 === 0) ? 'white' : 'black'}`}
            onClick={() => handleSquareClick(rowIndex, colIndex)}
          />
        ))
      ))}
    </div>
  );
};

export default Board;