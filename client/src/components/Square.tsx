// Import necessary dependencies
import { FC } from 'react';

// Define the props interface for the Square component
interface SquareProps {
  isBlack: boolean;  // Determines if this is a black or white square
  piece?: 'red' | 'black' | null;  // The piece on this square (if any)
}

// Square component represents a single square on the board
const Square: FC<SquareProps> = ({ isBlack, piece }) => {
  return (
    // Square container with dynamic classes based on color
    <div className={`square ${isBlack ? 'black' : 'white'}`}>
      {/* Render piece if one exists */}
      {piece && <div className={`piece ${piece}`} />}
    </div>
  );
};

export default Square;

