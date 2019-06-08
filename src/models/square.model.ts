import { ChessColor } from './color.model';
import { ChessPiece } from './piece.model';

export class ChessSquare {

  public readonly color: ChessColor;
  public piece: ChessPiece = null;

  constructor(color: ChessColor) {
    this.color = color;
  }
}
