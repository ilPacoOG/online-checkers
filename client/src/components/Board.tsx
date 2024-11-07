import React, { useState } from 'react';
import { PieceType, Coordinates } from '../types/types';
import { isValidMove, executeMove, isCaptureMove, executeCapture, promoteToKing, isPlayerTurn, toggleTurn } from '../services/gameService';
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

        //had to change the player turns are handled so that it could be tested by a single yser based on the chip's turn so that the player turn logic could be tested.
        if (selectedPiece) {
            if (isCaptureMove(board, selectedPiece, selectedSquare)) {
                const newBoard = executeCapture(board, selectedPiece, selectedSquare);
                setBoard(promoteToKing(newBoard, selectedSquare));
                toggleTurn(); //this toggles the turn after a valid capture move
            } else if (isValidMove(board, selectedPiece, selectedSquare)) {
                const newBoard = executeMove(board, selectedPiece, selectedSquare);
                setBoard(promoteToKing(newBoard, selectedSquare));
                toggleTurn(); //this toggles the turn after a valid move
            } else {
                console.log("Invalid move");
            }
            setSelectedPiece(null); 
        } else {
            const piece = board[row][col];
            //this allows the tester to select a piece based on the turn. The tester can only select a piece that belongs to the player or the AI for their turn.
            if ((isPlayerTurn() && (piece === PieceType.PlayerPiece || piece === PieceType.PlayerKing)) ||
                (!isPlayerTurn() && (piece === PieceType.AIPiece || piece === PieceType.AIKing))) {
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
