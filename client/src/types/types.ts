// Enum for different piece types in the game
export enum PieceType {
  Empty = 0,
  PlayerPiece = 1,    // Regular player piece
  AIPiece = 2,        // Regular AI piece
  PlayerKing = 3,     // Player's king piece
  AIKing = 4          // AI's king piece
}

// Interface for board coordinates
export interface Coordinates {
  row: number;
  col: number;
}
