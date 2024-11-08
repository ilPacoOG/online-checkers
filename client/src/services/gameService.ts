import { PieceType, Coordinates } from '../types/types';

let playerTurn = true;

/**
 * Validates if a move is legal according to checkers rules
 * @param board Current game board
 * @param start Starting coordinates
 * @param end Ending coordinates
 * @returns boolean indicating if move is valid
 */
export function isValidMove(
    board: PieceType[][],
    start: Coordinates,
    end: Coordinates
): boolean {
    const piece = board[start.row][start.col];
    const targetPiece = board[end.row][end.col];

    // Validate board boundaries and target square emptiness
    if (
        end.row < 0 || end.row >= board.length ||
        end.col < 0 || end.col >= board[0].length ||
        targetPiece !== PieceType.Empty
    ) {
        return false;
    }

    // Calculate movement differences
    const rowDiff = end.row - start.row;
    const colDiff = Math.abs(end.col - start.col);

    // Regular player piece can only move forward (down)
    if (piece === PieceType.PlayerPiece && rowDiff === 1 && colDiff === 1) {
        return true;
    }

    // Regular AI piece can only move forward (up)
    if (piece === PieceType.AIPiece && rowDiff === -1 && colDiff === 1) {
        return true;
    }

    // King pieces can move in any diagonal direction
    if ((piece === PieceType.PlayerKing || piece === PieceType.AIKing) &&
        Math.abs(rowDiff) === 1 && colDiff === 1) {
        return true;
    }

    return false;
}

/**
 * Executes a regular move on the board
 * @param board Current game board
 * @param start Starting coordinates
 * @param end Ending coordinates
 * @returns New board state after move
 */
export function executeMove(
    board: PieceType[][],
    start: Coordinates,
    end: Coordinates
): PieceType[][] {
    const newBoard = board.map(row => [...row]); // Create deep copy of board
    newBoard[end.row][end.col] = newBoard[start.row][start.col];
    newBoard[start.row][start.col] = PieceType.Empty;
    return newBoard;
}

/**
 * Checks if a move is a capture move
 * @param board Current game board
 * @param start Starting coordinates
 * @param end Ending coordinates
 * @returns boolean indicating if move is a capture
 */
export function isCaptureMove(
    board: PieceType[][],
    start: Coordinates,
    end: Coordinates
): boolean {
    const piece = board[start.row][start.col];
    const opponentPiece = piece === PieceType.PlayerPiece || piece === PieceType.PlayerKing
        ? PieceType.AIPiece
        : PieceType.PlayerPiece;

    // Calculate middle square (captured piece location)
    const midRow = (start.row + end.row) / 2;
    const midCol = (start.col + end.col) / 2;

    // Validate capture conditions
    return (
        Math.abs(end.row - start.row) === 2 &&
        Math.abs(end.col - start.col) === 2 &&
        board[midRow][midCol] === opponentPiece &&
        board[end.row][end.col] === PieceType.Empty
    );
}

/**
 * Executes a capture move on the board
 * @param board Current game board
 * @param start Starting coordinates
 * @param end Ending coordinates
 * @returns New board state after capture
 */
export function executeCapture(
    board: PieceType[][],
    start: Coordinates,
    end: Coordinates
): PieceType[][] {
    const newBoard = board.map(row => [...row]);

    // Calculate captured piece location
    const midRow = (start.row + end.row) / 2;
    const midCol = (start.col + end.col) / 2;

    // Move the capturing piece
    newBoard[end.row][end.col] = newBoard[start.row][start.col];
    newBoard[start.row][start.col] = PieceType.Empty;

    // Remove the captured piece
    newBoard[midRow][midCol] = PieceType.Empty;

    return newBoard;
}

/**
 * Checks if additional captures are available from the given position
 * @param board Current game board
 * @param position Coordinates to check for further captures
 * @returns boolean indicating if more captures are available
 */

export function canContinueCapture(
    board: PieceType[][],
    position: Coordinates
): boolean {
    // const piece = board[position.row][position.col];
    const directions = [
        { row: 2, col: 2 },
        { row: 2, col: -2 },
        { row: -2, col: 2 },
        { row: -2, col: -2 }
    ];

    return directions.some(direction => {
        const end = {
            row: position.row + direction.row,
            col: position.col + direction.col
        };
        return isCaptureMove(board, position, end);
    });
}

/**
 * Promotes a piece to king if it reaches the opposite end
 * @param board Current game board
 * @param pos Position to check for promotion
 * @returns New board state after potential promotion
 */
export function promoteToKing(
    board: PieceType[][],
    pos: Coordinates
): PieceType[][] {
    const newBoard = board.map(row => [...row]);
    const piece = newBoard[pos.row][pos.col];

    // Check if piece reached opposite end
    if (piece === PieceType.PlayerPiece && pos.row === 7) {
        newBoard[pos.row][pos.col] = PieceType.PlayerKing;
    } else if (piece === PieceType.AIPiece && pos.row === 0) {
        newBoard[pos.row][pos.col] = PieceType.AIKing;
    }

    return newBoard;
}

/**
 * Checks if it's the player's turn
 * @returns boolean indicating if it is the player's turn
 */
export function isPlayerTurn(): boolean {
    return playerTurn;
}

/**
 * Toggles the turn between player and AI
 */
export function toggleTurn(): void {
    playerTurn = !playerTurn;
}

// TODO: Add AI move generation logic