import { FenErrorCode } from './fen-error-code.model';

export class FenError {

  readonly code: FenErrorCode;
  readonly position: number;
  readonly rank: number;

  private constructor(code: FenErrorCode, position: number, rank?: number) {
    this.code = code;
    this.position = position;
    this.rank = rank;
  }

  static createTooManyPiecesOnRank(position: number, rank: number): FenError {
    return new FenError(FenErrorCode.TooManyPiecesOnRank, position, rank);
  }

  static createTooManyEmptySquaresAddedToRank(position: number, rank: number): FenError {
    return new FenError(FenErrorCode.TooManyEmptySquaresAddedToRank, position, rank);
  }

  static createNotEnoughSquaresOnRank(position: number, rank: number): FenError {
    return new FenError(FenErrorCode.NotEnoughSquaresOnRank, position, rank);
  }

  static createTooManyRanksDefined(position: number): FenError {
    return new FenError(FenErrorCode.TooManyRanksDefined, position);
  }

  static createIllegalCharacterFound(position: number): FenError {
    return new FenError(FenErrorCode.IllegalCharacterFound, position);
  }

  static createNotEnoughSquaresDefined(position: number): FenError {
    return new FenError(FenErrorCode.NotEnoughSquaresDefined, position);
  }
}
