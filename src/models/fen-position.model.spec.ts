import { FenPosition } from './fen-position.model';
import { FenError } from './fen-error.model';
import { MockData } from './mock-data';

describe('FenPosition', () => {

  const testFenNotations = MockData.fenNotations;

  let result: FenPosition;

  beforeEach(() => {
    result = new FenPosition();
  });

  describe('get isValid()', () => {

    it('should return false when error is empty', () => {
      (result as any)._error = FenError.createIllegalCharacterFound(0);
      expect(result.isValid).toEqual(false);
    });

    it('should return true when error is not empty', () => {
      expect(result.isValid).toEqual(true);
    });
  });

  describe('_validate()', () => {

    describe('valid', () => {

      it('should not result in an error when empty board represented', () => {
        result.notation = testFenNotations.emptyBoard;
        expect(result.error).toBeUndefined();
      });

      it('should not result in an error when starting position represented', () => {
        result.notation = testFenNotations.startingPosition;
        expect(result.error).toBeUndefined();
      });
    });

    describe('invalid', () => {

      it('should result in an error when too many pieces on a rank', () => {
        result.notation = testFenNotations.tooManyPiecesOnRank;
        expect(result.error).toEqual(FenError.createTooManyPiecesOnRank(19, 2));
      });

      it('should result in an error when too many empty squares added to a rank', () => {
        result.notation = testFenNotations.tooManyEmptySquaresToRank;
        expect(result.error).toEqual(FenError.createTooManyEmptySquaresAddedToRank(15, 1));
      });

      it('should result in an error when not enough squares defined on a rank', () => {
        result.notation = testFenNotations.notEnoughSquaresOnRank;
        expect(result.error).toEqual(FenError.createNotEnoughSquaresOnRank(15, 1));
      });

      it('should result in an error when when too many ranks defined', () => {
        result.notation = testFenNotations.tooManyRanksDefined;
        expect(result.error).toEqual(FenError.createTooManyRanksDefined(43));
      });

      it('should result in an error when illegal character found', () => {
        result.notation = testFenNotations.illegalCharacterFound;
        expect(result.error).toEqual(FenError.createIllegalCharacterFound(3));
      });

      it('should result in an error when not enough squares defined', () => {
        result.notation = testFenNotations.notEnoughSquaresDefined;
        expect(result.error).toEqual(FenError.createNotEnoughSquaresDefined(39));
      });
    });
  });

  describe('_validateNewRank(validationCounters: { charIndex: number, totalRanks: number, totalFiles: number })', () => {

    it('should set error to not enough squares on rank when total files is less than 8', () => {
      const validationCounters: FenPosition.ValidationCounters = {
        charIndex: 15,
        totalFiles: 6,
        totalRanks: 1,
        totalSquares: 0
      };

      (result as any)._validateNewRank(validationCounters);
      expect(result.error).toEqual(FenError.createNotEnoughSquaresOnRank(15, 1));
    });

    it('should set error to too many ranks defined when adding a rank results in more than 8 ranks', () => {
      const validationCounters: FenPosition.ValidationCounters = {
        charIndex: 43,
        totalFiles: 8,
        totalRanks: 8,
        totalSquares: 0
      };

      (result as any)._validateNewRank(validationCounters);
      expect(result.error).toEqual(FenError.createTooManyRanksDefined(43));
    });
  });

  describe('_validateChessPiece(validationCounters: { charIndex: number, totalRanks: number,' +
    'totalFiles: number, totalSquares: number})', () => {

      let validationCounters: FenPosition.ValidationCounters;

      beforeEach(() => {
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

        (result as any)._validateChessPiece(validationCounters);
        expect(result.error).toEqual(FenError.createTooManyPiecesOnRank(19, 3));
      });

      it('should raise the total files with one when the piece is valid', () => {
        validationCounters.totalFiles = 4;

        (result as any)._validateChessPiece(validationCounters);
        expect(validationCounters.totalFiles).toEqual(5);
      });

      it('should raise the total squares with one when the piece is valid', () => {
        validationCounters.totalSquares = 20;

        (result as any)._validateChessPiece(validationCounters);
        expect(validationCounters.totalSquares).toEqual(21);
      });
    });

  describe('_validateEmptySquare(char:string, validationCounters: {' +
    'charIndex: number, totalRanks: number,' +
    'totalFiles: number, totalSquares: number })', () => {

      const validationCounters: FenPosition.ValidationCounters = {
        charIndex: 0,
        totalRanks: 0,
        totalFiles: 0,
        totalSquares: 0
      };

      beforeEach(() => {
        validationCounters.totalFiles = 0;
        validationCounters.totalSquares = 0;
      });

      it('should set error when number of empty squares added to total files is more than 8', () => {
        (result as any)._validateEmptySquare('9', validationCounters);
        expect(result.error).toEqual(FenError.createTooManyEmptySquaresAddedToRank(0, 0));
      });

      it('should raise the total files with number of empty squares when valid', () => {
        (result as any)._validateEmptySquare('4', validationCounters);
        expect(validationCounters.totalFiles).toEqual(4);
      });

      it('should raise the total squares with number of empty squares when valid', () => {
        (result as any)._validateEmptySquare('4', validationCounters);
        expect(validationCounters.totalSquares).toEqual(4);
      });
    });
});
