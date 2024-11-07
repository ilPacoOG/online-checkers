import React, { useState } from 'react';
import { PieceType, Coordinates } from '../types/types';
import { isValidMove, executeMove, isCaptureMove, executeCapture, promoteToKing } from '../services/gameService';
import Square from './Square';
import './Board.css'; 

const initializeBoard = (): PieceType[][] => [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0]
];


const Board: React.FC = () => {
    const [board, setBoard] = useState<PieceType[][]>(initializeBoard());
    const [selectedPiece, setSelectedPiece] = useState<Coordinates | null>(null);

    
    const handleSquareClick = (row: number, col: number) => {
        const selectedSquare = { row, col };

        if (selectedPiece) {
            if (isCaptureMove(board, selectedPiece, selectedSquare)) {
               
                const newBoard = executeCapture(board, selectedPiece, selectedSquare);
                setBoard(promoteToKing(newBoard, selectedSquare));
            } else if (isValidMove(board, selectedPiece, selectedSquare)) {
              
                const newBoard = executeMove(board, selectedPiece, selectedSquare);
                setBoard(promoteToKing(newBoard, selectedSquare));
            } else {
                console.log("Invalid move");
            }

            
            setSelectedPiece(null);
        } else {
            
            if (board[row][col] !== PieceType.Empty) {
                setSelectedPiece(selectedSquare);
            }
        }
    };

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
