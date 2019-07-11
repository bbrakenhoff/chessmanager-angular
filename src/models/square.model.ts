import { ChessColor } from './color.model';
import { ChessPiece } from './piece.model';

export class ChessSquare {
  readonly color: ChessColor;
  piece: ChessPiece = null;

  private constructor(color: ChessColor) {
    this.color = color;
  }

   static create(color: ChessColor) {
     return new ChessSquare(color);
   }
}
