import { FenDiagram } from './fen-diagram.model';
import { FenError } from './fen-error.model';
import { TestDataFactory } from 'src/app/util/test-data-factory';

describe('FenDiagram', () => {
  const testFenNotations = TestDataFactory.createFenNotations();

  describe('static create()', () => {
    it('should create a new fen diagram', () => {
      const fenDiagram: FenDiagram = FenDiagram.create();
      expect(fenDiagram).toBeDefined();
      expect(fenDiagram.id).toBeDefined();
      expect(fenDiagram.id).not.toEqual('');
      expect(fenDiagram.description).toEqual('');
      expect(fenDiagram.collectionId).toEqual('');
      expect(fenDiagram.notation).toEqual('');
      expect(fenDiagram.error).toBeNull();
    });
  });

  describe('static createFromJson(json: any)', () => {
    it('should create a fen diagram from JSON', () => {
      const json = {
        collectionId: 'fb1b177a-8088-4ce6-8666-d36284a195e1',
        description: 'Illegal character found',
        _id: 'ffe2e91f-277d-4ffe-baee-c1a84c36d0fb',
        _error: null,
        _notation: 'rnbXkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
      };

      const fenDiagram = FenDiagram.createFromJson(json);
      expect(fenDiagram).toBeDefined();
      expect(fenDiagram.id).toEqual(json._id);
      expect(fenDiagram.collectionId).toEqual(json.collectionId);
      expect(fenDiagram.description).toEqual(json.description);
      expect(fenDiagram.notation).toEqual(json._notation);
      expect(fenDiagram.isValid).toEqual(false);
    });
  });

  describe('get isValid()', () => {
    let result: FenDiagram;

    beforeEach(() => {
      result = FenDiagram.create();
    });

    it('should return false when error is empty', () => {
      (result as any)._error = FenError.createIllegalCharacterFound(0);
      expect(result.isValid).toEqual(false);
    });

    it('should return true when error is not empty', () => {
      expect(result.isValid).toEqual(true);
    });
  });

  describe('_validate()', () => {
    let fenDiagram: FenDiagram;

    beforeEach(() => {
      fenDiagram = FenDiagram.create();
    });

    describe('valid', () => {
      it('should not result in an error when empty board represented', () => {
        fenDiagram.notation = testFenNotations.emptyBoard;
        expect(fenDiagram.error).toBeNull();
      });

      it('should not result in an error when starting position represented', () => {
        fenDiagram.notation = testFenNotations.startingPosition;
        expect(fenDiagram.error).toBeNull();
      });
    });

    describe('invalid', () => {

      it('should result in an error when too many pieces on a rank', () => {
        fenDiagram.notation = testFenNotations.tooManyPiecesOnRank;
        expect(fenDiagram.error).toEqual(FenError.createTooManyPiecesOnRank(19, 2));
      });

      it('should result in an error when too many empty squares added to a rank', () => {
        fenDiagram.notation = testFenNotations.tooManyEmptySquaresToRank;
        expect(fenDiagram.error).toEqual(
          FenError.createTooManyEmptySquaresAddedToRank(15, 1)
        );
      });

      it('should result in an error when not enough squares defined on a rank', () => {
        fenDiagram.notation = testFenNotations.notEnoughSquaresOnRank;
        expect(fenDiagram.error).toEqual(
          FenError.createNotEnoughSquaresOnRank(15, 1)
        );
      });

      it('should result in an error when when too many ranks defined', () => {
        fenDiagram.notation = testFenNotations.tooManyRanksDefined;
        expect(fenDiagram.error).toEqual(FenError.createTooManyRanksDefined(43));
      });

      it('should result in an error when illegal character found', () => {
        fenDiagram.notation = testFenNotations.illegalCharacterFound;
        expect(fenDiagram.error).toEqual(FenError.createIllegalCharacterFound(3));
      });

      it('should result in an error when not enough squares defined', () => {
        fenDiagram.notation = testFenNotations.notEnoughSquaresDefined;
        expect(fenDiagram.error).toEqual(
          FenError.createNotEnoughSquaresDefined(39)
        );
      });
    });
  });

  describe('_validateNewRank(validationCounters: { charIndex: number, totalRanks: number, totalFiles: number })', () => {
    let fenDiagram: FenDiagram;

    beforeEach(() => {
      fenDiagram = FenDiagram.create();
    });

    it('should set error to not enough squares on rank when total files is less than 8', () => {
      const validationCounters: FenDiagram.ValidationCounters = {
        charIndex: 15,
        totalFiles: 6,
        totalRanks: 1,
        totalSquares: 0
      };

      (fenDiagram as any)._validateNewRank(validationCounters);
      expect(fenDiagram.error).toEqual(
        FenError.createNotEnoughSquaresOnRank(15, 1)
      );
    });

    it('should set error to too many ranks defined when adding a rank results in more than 8 ranks', () => {
      const validationCounters: FenDiagram.ValidationCounters = {
        charIndex: 43,
        totalFiles: 8,
        totalRanks: 8,
        totalSquares: 0
      };

      (fenDiagram as any)._validateNewRank(validationCounters);
      expect(fenDiagram.error).toEqual(FenError.createTooManyRanksDefined(43));
    });
  });

  describe(
    '_validateChessPiece(validationCounters: { charIndex: number, totalRanks: number,' +
      'totalFiles: number, totalSquares: number})',
    () => {
      let fenDiagram: FenDiagram;
      let validationCounters: FenDiagram.ValidationCounters;

      beforeEach(() => {
        fenDiagram = FenDiagram.create();
        validationCounters = {
          charIndex: 19,
          totalRanks: 3,
          totalFiles: 0,
          totalSquares: 0
        };
      });

      it('should set an error when adding a piece results in more than 8 squares on a rank', () => {
        validationCounters.totalFiles = 8;
        validationCounters.totalSquares = 24;

        (fenDiagram as any)._validateChessPiece(validationCounters);
        expect(fenDiagram.error).toEqual(FenError.createTooManyPiecesOnRank(19, 3));
      });

      it('should raise the total files with one when the piece is valid', () => {
        validationCounters.totalFiles = 4;

        (fenDiagram as any)._validateChessPiece(validationCounters);
        expect(validationCounters.totalFiles).toEqual(5);
      });

      it('should raise the total squares with one when the piece is valid', () => {
        validationCounters.totalSquares = 20;

        (fenDiagram as any)._validateChessPiece(validationCounters);
        expect(validationCounters.totalSquares).toEqual(21);
      });
    }
  );

  describe(
    '_validateEmptySquare(char:string, validationCounters: {' +
      'charIndex: number, totalRanks: number,' +
      'totalFiles: number, totalSquares: number })',
    () => {
      let fenDiagram: FenDiagram;

      const validationCounters: FenDiagram.ValidationCounters = {
        charIndex: 0,
        totalRanks: 0,
        totalFiles: 0,
        totalSquares: 0
      };

      beforeEach(() => {
        fenDiagram = FenDiagram.create();
        validationCounters.totalFiles = 0;
        validationCounters.totalSquares = 0;
      });

      it('should set error when number of empty squares added to total files is more than 8', () => {
        (fenDiagram as any)._validateEmptySquare('9', validationCounters);
        expect(fenDiagram.error).toEqual(
          FenError.createTooManyEmptySquaresAddedToRank(0, 0)
        );
      });

      it('should raise the total files with number of empty squares when valid', () => {
        (fenDiagram as any)._validateEmptySquare('4', validationCounters);
        expect(validationCounters.totalFiles).toEqual(4);
      });

      it('should raise the total squares with number of empty squares when valid', () => {
        (fenDiagram as any)._validateEmptySquare('4', validationCounters);
        expect(validationCounters.totalSquares).toEqual(4);
      });
    }
  );
});
