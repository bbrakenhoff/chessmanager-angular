import { PieceType } from './piece-type.model';

export class FenCharUtil {

  public static charRepresentsEmptySquare(char: string): boolean {
    switch (char) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8': return true;
      default: return false;
    }
  }

  public static charRepresentsChessPiece(char: string): boolean {
    const pieceTypes: string[] = [PieceType.Bishop, PieceType.King, PieceType.Knight, PieceType.Pawn, PieceType.Queen, PieceType.Rook];
    return pieceTypes.includes(char.toUpperCase());
  }

  public static charRepresentsNewRank(char: string): boolean {
    return char === '/';
  }
}
