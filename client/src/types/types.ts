


export enum PieceType {
  Empty = 0,
  PlayerPiece = 1,
  AIPiece = 2,
  PlayerKing = 3,
  AIKing = 4
}

export interface Coordinates {
  row: number;
  col: number;
}

export interface Piece {
  type: PieceType;
  coordinates: Coordinates;
}
