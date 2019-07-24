import { Chessboard } from './chessboard.model';
import { ChessColor } from './color.model';
import { FenDiagram } from './fen-diagram.model';
import { ChessPiece } from './piece.model';
import { GlobalTestDataFactory } from 'src/app/util/test-data-factory';

describe('Chessboard', () => {
  const testFenNotations = GlobalTestDataFactory.createFenNotations();

  let chessboard: Chessboard;
  let fenDiagram: FenDiagram;

  beforeEach(() => {
    chessboard = Chessboard.create();
    fenDiagram = FenDiagram.create();
  });

  describe('static create()', () => {
    it('should create an empty chessboard', () => {
      expect(chessboard).toBeDefined();
    });

    it('should create 64 squares when called', () => {
      expect(chessboard.squares).toBeDefined();
      expect(chessboard.squares.length).toEqual(8);

      for (const rank of chessboard.squares) {
        expect(rank.length).toEqual(8);
      }
    });

    it('should create alternating white and black squares when called', () => {
      let expectedColor = ChessColor.White;

      for (let r = 0; r < 8; r++) {
        for (let f = 0; f < 8; f++) {
          expect(chessboard.squares[r][f].color).toEqual(expectedColor);

          if (f < 7) {
            expectedColor =
              expectedColor === ChessColor.White
                ? ChessColor.Black
                : ChessColor.White;
          }
        }
      }
    });
  });

  describe('reflectFenNotation(fenDiagram: FenDiagram)', () => {
    it('should reflect notation when fen diagram is valid', () => {
      fenDiagram.notation = testFenNotations.startingPosition;

      chessboard.reflectFenNotation(fenDiagram);

      expect(chessboard.squares[0][0].piece).toEqual(
        ChessPiece.createFromFenChar('r')
      );
      expect(chessboard.squares[0][1].piece).toEqual(
        ChessPiece.createFromFenChar('n')
      );
      expect(chessboard.squares[0][2].piece).toEqual(
        ChessPiece.createFromFenChar('b')
      );
      expect(chessboard.squares[0][3].piece).toEqual(
        ChessPiece.createFromFenChar('q')
      );
      expect(chessboard.squares[0][4].piece).toEqual(
        ChessPiece.createFromFenChar('k')
      );
      expect(chessboard.squares[0][5].piece).toEqual(
        ChessPiece.createFromFenChar('b')
      );
      expect(chessboard.squares[0][6].piece).toEqual(
        ChessPiece.createFromFenChar('n')
      );
      expect(chessboard.squares[0][7].piece).toEqual(
        ChessPiece.createFromFenChar('r')
      );

      for (const square of chessboard.squares[1]) {
        expect(square.piece).toEqual(ChessPiece.createFromFenChar('p'));
      }

      let r = 2;

      while (r < 6) {
        for (let f = 0; f < 8; f++) {
          expect(chessboard.squares[r][f].piece).toBeNull();
        }

        r++;
      }

      for (const square of chessboard.squares[6]) {
        expect(square.piece).toEqual(ChessPiece.createFromFenChar('P'));
      }

      expect(chessboard.squares[7][0].piece).toEqual(
        ChessPiece.createFromFenChar('R')
      );
      expect(chessboard.squares[7][1].piece).toEqual(
        ChessPiece.createFromFenChar('N')
      );
      expect(chessboard.squares[7][2].piece).toEqual(
        ChessPiece.createFromFenChar('B')
      );
      expect(chessboard.squares[7][3].piece).toEqual(
        ChessPiece.createFromFenChar('Q')
      );
      expect(chessboard.squares[7][4].piece).toEqual(
        ChessPiece.createFromFenChar('K')
      );
      expect(chessboard.squares[7][5].piece).toEqual(
        ChessPiece.createFromFenChar('B')
      );
      expect(chessboard.squares[7][6].piece).toEqual(
        ChessPiece.createFromFenChar('N')
      );
      expect(chessboard.squares[7][7].piece).toEqual(
        ChessPiece.createFromFenChar('R')
      );
    });

    it('should reflect notation until char index of fen error when fen diagram is invalid', () => {
      fenDiagram.notation = testFenNotations.illegalCharacterFound;

      chessboard.reflectFenNotation(fenDiagram);

      expect(chessboard.squares[0][0].piece).toEqual(
        ChessPiece.createFromFenChar('r')
      );
      expect(chessboard.squares[0][1].piece).toEqual(
        ChessPiece.createFromFenChar('n')
      );
      expect(chessboard.squares[0][2].piece).toEqual(
        ChessPiece.createFromFenChar('b')
      );
      expect(chessboard.squares[0][3].piece).toBeNull();
      expect(chessboard.squares[0][4].piece).toBeNull();
      expect(chessboard.squares[0][5].piece).toBeNull();
      expect(chessboard.squares[0][6].piece).toBeNull();
      expect(chessboard.squares[0][7].piece).toBeNull();

      for (let r = 1; r < 8; r++) {
        for (let f = 0; f < 8; f++) {
          expect(chessboard.squares[r][f].piece).toBeNull();
        }
      }
    });

    it('should reflect notation when there is a previous notation applied', () => {
      fenDiagram.notation = testFenNotations.startingPosition;
      chessboard.reflectFenNotation(fenDiagram);

      fenDiagram.notation = testFenNotations.eightQueensSolution;
      chessboard.reflectFenNotation(fenDiagram);

      const whiteQueenPositions = [
        { rank: 0, file: 0 },
        { rank: 1, file: 6 },
        { rank: 2, file: 4 },
        { rank: 3, file: 7 },
        { rank: 4, file: 1 },
        { rank: 5, file: 3 },
        { rank: 6, file: 5 },
        { rank: 7, file: 2 }
      ];
      const whiteQueen = ChessPiece.createFromFenChar('Q');

      for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
          const expectWhiteQueen = whiteQueenPositions.some(
            position => position.rank === rank && position.file === file
          );
          if (expectWhiteQueen) {
            expect(chessboard.squares[rank][file].piece).toEqual(whiteQueen);
          } else {
            expect(chessboard.squares[rank][file].piece).toBeNull();
          }
        }
      }
    });

    it('should clear remaining squares when fen diagram is invalid', () => {
      fenDiagram.notation = testFenNotations.foolsMate;
      chessboard.reflectFenNotation(fenDiagram);

      fenDiagram.notation = testFenNotations.foolsMate.substr(0, 3) + testFenNotations.foolsMate.substr(4);
      chessboard.reflectFenNotation(fenDiagram);

      expect(chessboard.squares[0][0].piece).toEqual(ChessPiece.createFromFenChar('r'));
      expect(chessboard.squares[0][1].piece).toEqual(ChessPiece.createFromFenChar('n'));
      expect(chessboard.squares[0][2].piece).toEqual(ChessPiece.createFromFenChar('b'));
      expect(chessboard.squares[0][3].piece).toEqual(ChessPiece.createFromFenChar('k'));
      expect(chessboard.squares[0][4].piece).toEqual(ChessPiece.createFromFenChar('b'));
      expect(chessboard.squares[0][5].piece).toEqual(ChessPiece.createFromFenChar('n'));
      expect(chessboard.squares[0][6].piece).toEqual(ChessPiece.createFromFenChar('r'));
      expect(chessboard.squares[0][7].piece).toBeNull();

      for (let r = 1; r < 8; r++) {
        for (let f = 0; f < 8; f++) {
          expect(chessboard.squares[r][f].piece).toBeNull();
        }
      }
    });
  });
});
