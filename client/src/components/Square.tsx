//adjusted from Matt's code to work with the game logic

import React from 'react';
import { PieceType } from '../types/types';

interface SquareProps {
    pieceType: PieceType;
    row: number;
    col: number;
    className: string;
    onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ pieceType, className, onClick }) => {
    const pieceClass = pieceType === PieceType.PlayerPiece
        ? 'player-piece'
        : pieceType === PieceType.AIPiece
        ? 'ai-piece'
        : '';

    return (
        <div className={className} onClick={onClick}>
            {pieceType !== PieceType.Empty && <div className={`piece ${pieceClass}`}></div>}
        </div>
    );
};

export default Square;

