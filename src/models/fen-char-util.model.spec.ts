import { FenCharUtil } from './fen-char-util.model';

describe('FenCharUtil', () => {

  describe('static charRepresentsEmptySquare(char: string)', () => {

    it('should return true when char equals a digit between 1 and 8', () => {
      const result = FenCharUtil.charRepresentsEmptySquare('3');
      expect(result).toEqual(true);
    });

    it('should return false when char equals "0"', () => {
      const result = FenCharUtil.charRepresentsEmptySquare('0');
      expect(result).toEqual(false);
    });

    it('should return false when char equals "9"', () => {
      const result = FenCharUtil.charRepresentsEmptySquare('9');
      expect(result).toEqual(false);
    });

    it('should return false when char does not equal a digit', () => {
      const result = FenCharUtil.charRepresentsEmptySquare('k');
      expect(result).toEqual(false);
    });
  });

  describe('static charRepresentsChessPiece(char: string)', () => {

    it('should return true when char equals one of the piece types as a uppercase letter', () => {
      const result = FenCharUtil.charRepresentsChessPiece('r');
      expect(result).toEqual(true);
    });

    it('should return true when char equals one of the piece types as a lowercase letter', () => {
      const result = FenCharUtil.charRepresentsChessPiece('R');
      expect(result).toEqual(true);
    });

    it('should return false when char does not equal one of the piece types', () => {
      const result = FenCharUtil.charRepresentsChessPiece('3');
      expect(result).toEqual(false);
    });
  });

  describe('static charRepresentsNewRank(char: string)', () => {

    it('should return true when the char equals "/"', () => {
      const result = FenCharUtil.charRepresentsNewRank('/');
      expect(result).toEqual(true);
    });

    it('should return false when char does not equal "/"', () => {
      const result = FenCharUtil.charRepresentsNewRank('R');
      expect(result).toEqual(false);
    });
  });
});
