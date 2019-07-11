import { ChessPiece } from './piece.model';
import { ChessColor } from './color.model';
import { PieceType } from './piece-type.model';

describe('Piece', () => {

  describe('static createFromColorAndType(color: ChessColor, type: PieceType)', () => [
    it('should create a new chess piece with given color and type', () => {
      const piece = ChessPiece.createFromColorAndType(
        ChessColor.White,
        PieceType.Queen
      );
      expect(piece).toBeDefined();
      expect(piece.color).toEqual(ChessColor.White);
      expect(piece.type).toEqual(PieceType.Queen);
    })
  ]);

  describe('static createFromFenChar(char: string)', () => {
    it('should throw an error when char does not represent a chess piece', () => {
      expect(() => ChessPiece.createFromFenChar('3')).toThrowError(
        'Char must represent a chess piece'
      );
    });

    it('should create a black piece char is lowercase', () => {
      const piece = ChessPiece.createFromFenChar('r');
      expect(piece.color).toEqual(ChessColor.Black);
    });

    it('should create a white piece when char is uppercase', () => {
      const piece = ChessPiece.createFromFenChar('R');
      expect(piece.color).toEqual(ChessColor.White);
    });

    it('should create piece with type that matches char', () => {
      const piece = ChessPiece.createFromFenChar('R');
      expect(piece.type).toEqual(PieceType.Rook);
    });
  });

  describe('toFenChar()', () => {
    it('should return fen char lowercase when piece is black', () => {
      const piece = ChessPiece.createFromColorAndType(ChessColor.Black, PieceType.Knight);
      const fenChar = piece.toFenChar();

      expect(fenChar).toEqual('n');
    });

    it('should return fen char uppercase when piece is white', () => {
      const piece = ChessPiece.createFromColorAndType(ChessColor.White, PieceType.Queen);
      const fenChar = piece.toFenChar();

      expect(fenChar).toEqual('Q');
    });
  });
});
