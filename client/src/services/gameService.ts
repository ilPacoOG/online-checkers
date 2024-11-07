import { PieceType, Coordinates } from '../types/types';

// We need to also add a function to validate whose turn it is to move. Will begin working on an isPlayerTurn function once I complete the AI integration.
export function isValidMove(
    board: PieceType[][],
    start: Coordinates,
    end: Coordinates
): boolean {
    const piece = board[start.row][start.col];
    const targetPiece = board[end.row][end.col];

    //check if destination is within bounds and empty
    if (
        end.row < 0 || end.row >= board.length ||
        end.col < 0 || end.col >= board[0].length ||
        targetPiece !== PieceType.Empty
    ) {
        return false;
    }

    // Determine movement direction based on piece type
    const rowDiff = end.row - start.row;
    const colDiff = Math.abs(end.col - start.col);

    if (piece === PieceType.PlayerPiece && rowDiff === 1 && colDiff === 1) {
        // player piece moving forward
        return true;
    }

    if (piece === PieceType.AIPiece && rowDiff === -1 && colDiff === 1) {
        //AI piece moving forward
        return true;
    }

    //check for king movement (can move diagonally in either direction)
    if ((piece === PieceType.PlayerKing || piece === PieceType.AIKing) &&
        Math.abs(rowDiff) === 1 && colDiff === 1) {
        return true;
    }

    return false;
}

// We need to add a function to execute a move on the board. 
export function executeMove(
  board: PieceType[][],
  start: Coordinates,
  end: Coordinates
): PieceType[][] {
  const newBoard = board.map(row => [...row]); // Create a copy of the board
  newBoard[end.row][end.col] = newBoard[start.row][start.col];
  newBoard[start.row][start.col] = PieceType.Empty;
  return newBoard;
}
// the isCaptureMove function checks if a move is a capture move.
export function isCaptureMove(
  board: PieceType[][],
  start: Coordinates,
  end: Coordinates
): boolean {
  const piece = board[start.row][start.col];
  const opponentPiece = piece === PieceType.PlayerPiece || piece === PieceType.PlayerKing
      ? PieceType.AIPiece
      : PieceType.PlayerPiece;

  const midRow = (start.row + end.row) / 2;
  const midCol = (start.col + end.col) / 2;

  //need capture conditions: move is a jump (2 rows, 2 cols) over an opponent's piece
  return (
      Math.abs(end.row - start.row) === 2 &&
      Math.abs(end.col - start.col) === 2 &&
      board[midRow][midCol] === opponentPiece &&
      board[end.row][end.col] === PieceType.Empty
  );
}

// the executeCapture function executes a capture move on the board.
export function executeCapture(
  board: PieceType[][],
  start: Coordinates,
  end: Coordinates
): PieceType[][] {
  const newBoard = board.map(row => [...row]); //make a copy of the board

  const midRow = (start.row + end.row) / 2;
  const midCol = (start.col + end.col) / 2;

  // move piece
  newBoard[end.row][end.col] = newBoard[start.row][start.col];
  newBoard[start.row][start.col] = PieceType.Empty;

  //remove captured piece
  newBoard[midRow][midCol] = PieceType.Empty;

  return newBoard;
}
//the promoteToKing function promotes a piece to a king if it reaches the other side of the board.
export function promoteToKing(board: PieceType[][], pos: Coordinates): PieceType[][] {
  const newBoard = board.map(row => [...row]); //make a copy of board
  const piece = newBoard[pos.row][pos.col];

  if (piece === PieceType.PlayerPiece && pos.row === 7) {
      newBoard[pos.row][pos.col] = PieceType.PlayerKing;
  } else if (piece === PieceType.AIPiece && pos.row === 0) {
      newBoard[pos.row][pos.col] = PieceType.AIKing;
  }

  return newBoard;
}

