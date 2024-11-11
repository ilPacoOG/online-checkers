import React, { useState } from 'react';
import { PieceType, Coordinates } from '../types/types';
import {
    isValidMove, executeMove, isCaptureMove, executeCapture,
    promoteToKing, toggleTurn, isPlayerTurn, canContinueCapture, fetchAIMove
} from '../services/gameService';
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
    const [canMakeAdditionalCapture, setCanMakeAdditionalCapture] = useState(false);

    const handleSquareClick = async (row: number, col: number) => {
        const selectedSquare = { row, col };
        const piece = board[row][col];

        console.log("Clicked on square:", selectedSquare, "Piece:", piece);

        if (selectedPiece) {
            console.log("Currently selected piece:", selectedPiece);
            console.log("Attempting move from", selectedPiece, "to", selectedSquare);

            if (isCaptureMove(board, selectedPiece, selectedSquare)) {
                const newBoard = executeCapture(board, selectedPiece, selectedSquare);
                setBoard(promoteToKing(newBoard, selectedSquare));

                if (canContinueCapture(newBoard, selectedSquare)) {
                    setSelectedPiece(selectedSquare);
                    setCanMakeAdditionalCapture(true);
                } else {
                    setCanMakeAdditionalCapture(false);
                    toggleTurn();
                    console.log("Player turn over, fetching AI move...");
                    await handleAIMove(newBoard); // Trigger AI move
                }
            } else if (isValidMove(board, selectedPiece, selectedSquare) && !canMakeAdditionalCapture) {
                const newBoard = executeMove(board, selectedPiece, selectedSquare);
                setBoard(promoteToKing(newBoard, selectedSquare));
                toggleTurn();
                console.log("Valid player move, fetching AI move...");
                await handleAIMove(newBoard); // Trigger AI move
            } else {
                console.log("Invalid move");
            }

            if (!canMakeAdditionalCapture) {
                setSelectedPiece(null);
            }
        } else {
            // Allow selecting a piece only if it matches the player's turn and is a valid piece type
            if ((isPlayerTurn() && (piece === PieceType.PlayerPiece || piece === PieceType.PlayerKing)) ||
                (!isPlayerTurn() && (piece === PieceType.AIPiece || piece === PieceType.AIKing))) {
                setSelectedPiece(selectedSquare);
                console.log("Piece selected:", selectedSquare);
            }
        }
    };

    const sendFeedbackForInvalidMove = async (board: PieceType[][]) => {
        try {
            console.log("Sending feedback for invalid AI move...");
            const response = await fetch('http://localhost:3001/api/ai/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ board })
            });
            const newMove = await response.json();
            console.log("Received new AI move:", newMove);

            if (newMove && Array.isArray(newMove.start) && Array.isArray(newMove.end)) {
                const start: Coordinates = { row: newMove.start[0], col: newMove.start[1] };
                const end: Coordinates = { row: newMove.end[0], col: newMove.end[1] };
                applyAIMove(board, start, end);
            }
        } catch (error) {
            console.error("Error sending feedback for invalid AI move:", error);
        }
    };

    const applyAIMove = (updatedBoard: PieceType[][], start: Coordinates, end: Coordinates) => {
        if (isValidMove(updatedBoard, start, end) || isCaptureMove(updatedBoard, start, end)) {
            const newBoard = isCaptureMove(updatedBoard, start, end)
                ? executeCapture(updatedBoard, start, end)
                : executeMove(updatedBoard, start, end);
            setBoard(promoteToKing(newBoard, end));
            toggleTurn();
        } else {
            console.error("Invalid AI move generated:", { start, end });
            sendFeedbackForInvalidMove(updatedBoard);
        }
    };

    const handleAIMove = async (updatedBoard: PieceType[][]) => {
        try {
            const response = await fetchAIMove(updatedBoard);
            console.log("Raw AI move response:", response);

            if (response && Array.isArray(response.start) && Array.isArray(response.end)) {
                const start: Coordinates = { row: response.start[0], col: response.start[1] };
                const end: Coordinates = { row: response.end[0], col: response.end[1] };
                applyAIMove(updatedBoard, start, end);
            } else {
                console.error("AI move is not in the correct format:", response);
            }
        } catch (error) {
            console.error("Error handling AI move:", error);
        }
    };

    return (
        <div className="board-container">
            {board.map((row, rowIndex) => (
                row.map((piece, colIndex) => (
                    <Square
                        key={`${rowIndex}-${colIndex}`}
                        piece={piece}
                        isSelected={selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex}
                        isBlack={(rowIndex + colIndex) % 2 !== 0}
                        onClick={() => handleSquareClick(rowIndex, colIndex)}
                    />
                ))
            ))}
        </div>
    );
};

export default Board;
