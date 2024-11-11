// Import necessary dependencies
import React from 'react';
import { PieceType } from '../types/types';
import './Square.css';

// Define the props interface for the Square component
interface SquareProps {
  piece: PieceType;      // Type of piece on this square (empty, player, AI)
  isSelected: boolean;    // Whether this square is currently selected
  isBlack: boolean;      // Whether this is a black square on the board
  onClick: () => void;   // Click handler function
}

// Square component - Represents a single square on the checkers board
const Square: React.FC<SquareProps> = ({
  piece,
  isSelected,
  isBlack,
  onClick
}) => {
  const getPieceClass = () => {
    switch (piece) {
      case PieceType.PlayerPiece:
        return 'piece player-piece';
      case PieceType.AIPiece:
        return 'piece ai-piece';
      case PieceType.PlayerKing:
        return 'piece player-king';
      case PieceType.AIKing:
        return 'piece ai-king';
      default:
        return '';
    }
  };

  return (
    // Main square container
    <div
      // Dynamic class names based on props
      className={`
        square                          /* Base square class */
        ${isBlack ? 'black' : 'white'}  /* Color of square */
        ${isSelected ? 'selected' : ''} /* Highlight if selected */
      `}
      onClick={onClick} // Handle click events
    >
      {/* Render piece if square is not empty */}
      {piece !== PieceType.Empty && (
        <div
          // Dynamic class names for the piece
          className={getPieceClass()}
        />
      )}
    </div>
  );
};

export default Square;