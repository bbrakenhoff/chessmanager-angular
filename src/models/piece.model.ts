import { ChessColor } from './color.model';
import { PieceType } from './piece-type.model';
import { FenCharUtil } from './fen-char-util.model';

export class ChessPiece {

  public readonly color: ChessColor;
  public readonly type: PieceType;

  constructor(color: ChessColor, type: PieceType) {
    this.color = color;
    this.type = type;
  }

  static fromFenChar(char: string): ChessPiece {
    if (!FenCharUtil.charRepresentsChessPiece(char)) {
      throw new Error('Char must represent a chess piece');
    }

    const color = char === char.toUpperCase() ? ChessColor.White : ChessColor.Black;
    return new ChessPiece(color, char as PieceType);
  }
}
