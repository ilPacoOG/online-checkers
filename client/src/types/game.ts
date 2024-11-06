export type PieceType = 'red' | 'black' | null;
export type Position = {
  row: number;
  col: number;
};

export interface GameState {
  board: PieceType[][];
  currentTurn: 'red' | 'black';
  selectedPiece: Position | null;
  validMoves: Position[];
}