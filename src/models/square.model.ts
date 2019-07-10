import { ChessColor } from './color.model';
import { ChessPiece } from './piece.model';

export class ChessSquare {
  readonly color: ChessColor;
  piece: ChessPiece = null;

  constructor(color: ChessColor) {
    this.color = color;
  }
}
