import { FenError } from './fen-error.model';
import { FenErrorCode } from './fen-error-code.model';

describe('FenError', () => {

  describe('createTooManyPiecesOnRank(position: number, rank: number)', () => {

    it('should create FenError with FenErrorCode.TooManyPiecesOnRank', () => {
      const result = FenError.createTooManyPiecesOnRank(3, 2);
      expect(result.code).toEqual(FenErrorCode.TooManyPiecesOnRank);
      expect(result.position).toEqual(3);
      expect(result.rank).toEqual(2);
    });
  });

  describe('createTooManyEmptySquaresAddedToRank(position: number, rank: number)', () => {

    it('should create FenError with FenErrorCode.TooManyEmptySquaresAddedToRank', () => {
      const result = FenError.createTooManyEmptySquaresAddedToRank(3, 2);
      expect(result.code).toEqual(FenErrorCode.TooManyEmptySquaresAddedToRank);
      expect(result.position).toEqual(3);
      expect(result.rank).toEqual(2);
    });
  });

  describe('createNotEnoughSquaresOnRank(position: number, rank: number)', () => {

    it('should create FenError with FenErrorCode.NotEnoughSquaresDefinedOnRank', () => {
      const result = FenError.createNotEnoughSquaresOnRank(3, 2);
      expect(result.code).toEqual(FenErrorCode.NotEnoughSquaresOnRank);
      expect(result.position).toEqual(3);
      expect(result.rank).toEqual(2);
    });
  });

  describe('createTooManyRanksDefined(position: number)', () => {

    it('should create FenError with FenErrorCode.TooManyRanksDefined', () => {
      const result = FenError.createTooManyRanksDefined(3);
      expect(result.code).toEqual(FenErrorCode.TooManyRanksDefined);
      expect(result.position).toEqual(3);
      expect(result.rank).toBeUndefined();
    });
  });

  describe('createIllegalCharacterFound(position: number)', () => {

    it('should create FenError with FenErrorCode.IllegalCharacterFound', () => {
      const result = FenError.createIllegalCharacterFound(3);
      expect(result.code).toEqual(FenErrorCode.IllegalCharacterFound);
      expect(result.position).toEqual(3);
      expect(result.rank).toBeUndefined();
    });
  });

  describe('createNotEnoughSquaresDefined(position: number)', () => {

    it('should create FenError with FenErrorCode.NotEnoughSquaresDefined', () => {
      const result = FenError.createNotEnoughSquaresDefined(3);
      expect(result.code).toEqual(FenErrorCode.NotEnoughSquaresDefined);
      expect(result.position).toEqual(3);
      expect(result.rank).toBeUndefined();
    });
  });
});
