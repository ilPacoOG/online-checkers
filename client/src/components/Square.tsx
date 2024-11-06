import { FC } from 'react';

interface SquareProps {
  isBlack: boolean;
  piece?: 'red' | 'black' | null;
}

export const Square: FC<SquareProps> = ({ isBlack, piece }) => {
  return (
    <div className={`square ${isBlack ? 'black' : 'white'}`}>
      {piece && <div className={`piece ${piece}`} />}
    </div>
  );
};