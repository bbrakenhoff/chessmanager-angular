import { ChessPiece } from './piece.model';
import { ChessColor } from './color.model';
import { PieceType } from './piece-type.model';

describe('Piece', () => {
  it('constructor(color: ChessColor, type: PieceType)', () => {
    const piece = new ChessPiece(ChessColor.Black, PieceType.Bishop);
    expect(piece.color).toEqual(ChessColor.Black);
    expect(piece.type).toEqual(PieceType.Bishop);
  });

  describe('fromFenChar(char: string)', () => {
    it('should throw an error when char does not represent a chess piece', () => {
      expect(() => ChessPiece.fromFenChar('3')).toThrowError(
        'Char must represent a chess piece'
      );
    });

    it('should create a black piece char is lowercase', () => {
      const piece = ChessPiece.fromFenChar('r');
      expect(piece.color).toEqual(ChessColor.Black);
    });

    it('should create a white piece when char is uppercase', () => {
      const piece = ChessPiece.fromFenChar('R');
      expect(piece.color).toEqual(ChessColor.White);
    });

    it('should create piece with type that matches char', () => {
      const piece = ChessPiece.fromFenChar('R');
      expect(piece.type).toEqual(PieceType.Rook);
    });
  });

  describe('toFenChar()', () => {
    it('should return fen char lowercase when piece is black', () => {
      const piece = new  ChessPiece(ChessColor.Black, PieceType.Knight);
      const fenChar = piece.toFenChar();

      expect(fenChar).toEqual('n');
    });

    it('should return fen char uppercase when piece is white', () => {
      const piece = new ChessPiece(ChessColor.White, PieceType.Queen);
      const fenChar = piece.toFenChar();

      expect(fenChar).toEqual('Q');
    });
  });
});
