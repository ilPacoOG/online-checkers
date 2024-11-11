import { PieceType, Coordinates, AIMove } from '../types/types';

let isPlayerTurnState = true;

export const isPlayerTurn = (): boolean => isPlayerTurnState;

export const toggleTurn = (): void => {
    isPlayerTurnState = !isPlayerTurnState;
};

export const isValidMove = (
    board: PieceType[][],
    start: Coordinates,
    end: Coordinates
): boolean => {
    // Basic move validation
    if (end.row < 0 || end.row >= 8 || end.col < 0 || end.col >= 8) return false;
    if (board[end.row][end.col] !== PieceType.Empty) return false;

    const piece = board[start.row][start.col];
    const rowDiff = end.row - start.row;
    const colDiff = Math.abs(end.col - start.col);

    // Regular pieces can only move forward
    if (piece === PieceType.PlayerPiece && rowDiff >= 0) return false;
    if (piece === PieceType.AIPiece && rowDiff <= 0) return false;

    // Kings can move in any direction
    if (piece === PieceType.PlayerKing || piece === PieceType.AIKing) {
        return Math.abs(rowDiff) === 1 && colDiff === 1;
    }

    // Regular pieces move one square diagonally
    return Math.abs(rowDiff) === 1 && colDiff === 1;
};

export const isCaptureMove = (
    board: PieceType[][],
    start: Coordinates,
    end: Coordinates
): boolean => {
    const rowDiff = end.row - start.row;
    const colDiff = end.col - start.col;

    if (Math.abs(rowDiff) !== 2 || Math.abs(colDiff) !== 2) return false;

    const jumpedRow = start.row + rowDiff / 2;
    const jumpedCol = start.col + colDiff / 2;
    const jumpedPiece = board[jumpedRow][jumpedCol];

    const isPlayerPiece = (piece: PieceType) => 
        piece === PieceType.PlayerPiece || piece === PieceType.PlayerKing;
    const isAIPiece = (piece: PieceType) => 
        piece === PieceType.AIPiece || piece === PieceType.AIKing;

    if (isPlayerPiece(board[start.row][start.col])) {
        return isAIPiece(jumpedPiece);
    } else {
        return isPlayerPiece(jumpedPiece);
    }
};

export const executeMove = (
    board: PieceType[][],
    start: Coordinates,
    end: Coordinates
): PieceType[][] => {
    const newBoard = board.map(row => [...row]);
    newBoard[end.row][end.col] = newBoard[start.row][start.col];
    newBoard[start.row][start.col] = PieceType.Empty;
    return newBoard;
};

export const executeCapture = (
    board: PieceType[][],
    start: Coordinates,
    end: Coordinates
): PieceType[][] => {
    const newBoard = executeMove(board, start, end);
    const jumpedRow = start.row + (end.row - start.row) / 2;
    const jumpedCol = start.col + (end.col - start.col) / 2;
    newBoard[jumpedRow][jumpedCol] = PieceType.Empty;
    return newBoard;
};

export const promoteToKing = (
    board: PieceType[][],
    position: Coordinates
): PieceType[][] => {
    const newBoard = board.map(row => [...row]);
    const piece = newBoard[position.row][position.col];

    if (piece === PieceType.PlayerPiece && position.row === 0) {
        newBoard[position.row][position.col] = PieceType.PlayerKing;
    } else if (piece === PieceType.AIPiece && position.row === 7) {
        newBoard[position.row][position.col] = PieceType.AIKing;
    }

    return newBoard;
};

export const canContinueCapture = (
    board: PieceType[][],
    position: Coordinates
): boolean => {
    const piece = board[position.row][position.col];
    const directions = piece === PieceType.PlayerKing || piece === PieceType.AIKing
        ? [[-2, -2], [-2, 2], [2, -2], [2, 2]]
        : piece === PieceType.PlayerPiece
            ? [[-2, -2], [-2, 2]]
            : [[2, -2], [2, 2]];

    return directions.some(([rowDiff, colDiff]) => {
        const endRow = position.row + rowDiff;
        const endCol = position.col + colDiff;
        if (endRow < 0 || endRow >= 8 || endCol < 0 || endCol >= 8) return false;
        
        return isCaptureMove(board, position, { row: endRow, col: endCol });
    });
};

export const fetchAIMove = async (board: PieceType[][]): Promise<AIMove> => {
    try {
        const response = await fetch('http://localhost:3002/api/game/ai-move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ board }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch AI move');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching AI move:', error);
        throw error;
    }
};
