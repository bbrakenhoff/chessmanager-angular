import { ChessPiece } from './piece.model';
import { ChessColor } from './color.model';
import { PieceType } from './piece-type.model';

describe('Piece', () => {

  it('constructor(color: ChessColor, type: PieceType)', () => {
    const result = new ChessPiece(ChessColor.Black, PieceType.Bishop);
    expect(result.color).toEqual(ChessColor.Black);
    expect(result.type).toEqual(PieceType.Bishop);
  });

  describe('fromFenChar(char: string)', () => {

    it('should throw an error when char does not represent a chess piece', () => {
      expect(() => ChessPiece.fromFenChar('3')).toThrowError('Char must represent a chess piece');
    });

    it('should create a black piece char is lowercase', () => {
      const result = ChessPiece.fromFenChar('r');
      expect(result.color).toEqual(ChessColor.Black);
    });

    it('should create a white piece when char is uppercase', () => {
      const result = ChessPiece.fromFenChar('R');
      expect(result.color).toEqual(ChessColor.White);
    });

    it('should create piece with type that matches char', () => {
      const result = ChessPiece.fromFenChar('R');
      expect(result.type).toEqual(PieceType.Rook);
    });
  });
});
