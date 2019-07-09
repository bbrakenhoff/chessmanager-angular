import { FenError } from './fen-error.model';
import { FenCharUtil } from './fen-char-util.model';
import * as uuid from 'uuid/v4';


export class FenPosition {
  readonly id = uuid();
  description = '';
  collectionId: string = null;

  // tslint:disable-next-line: variable-name
  private _notation = '';
  get notation(): string {
    return this._notation;
  }

  set notation(value: string) {
    this._notation = value;

    this._validate();
  }

  // tslint:disable-next-line: variable-name
  private _error: FenError;
  get error(): FenError {
    return this._error;
  }

  get isValid(): boolean {
    return !this.error;
  }

  private _validate() {
    // Wrap in vairable, so they can be updated by reference outside this method
    const validationCounters: FenPosition.ValidationCounters = {
      charIndex: 0,
      totalRanks: 0,
      totalFiles: 0,
      totalSquares: 0
    };

    while (
      this.isValid &&
      validationCounters.charIndex < this.notation.length
    ) {
      const char = this.notation.charAt(validationCounters.charIndex);
      if (FenCharUtil.charRepresentsNewRank(char)) {
        this._validateNewRank(validationCounters);
      } else if (FenCharUtil.charRepresentsChessPiece(char)) {
        this._validateChessPiece(validationCounters);
      } else if (FenCharUtil.charRepresentsEmptySquare(char)) {
        this._validateEmptySquare(char, validationCounters);
      } else {
        this._error = FenError.createIllegalCharacterFound(
          validationCounters.charIndex
        );
      }

      validationCounters.charIndex++;
    }

    if (this.isValid && validationCounters.totalSquares < 64) {
      this._error = FenError.createNotEnoughSquaresDefined(
        this.notation.length - 1
      );
    }
  }

  private _validateNewRank(
    validationCounters: FenPosition.ValidationCounters
  ): void {
    if (validationCounters.totalFiles < 8) {
      this._error = FenError.createNotEnoughSquaresOnRank(
        validationCounters.charIndex,
        validationCounters.totalRanks
      );
      return;
    }

    if (validationCounters.totalRanks + 1 > 7) {
      this._error = FenError.createTooManyRanksDefined(
        validationCounters.charIndex
      );
      return;
    }

    validationCounters.totalRanks++;
    validationCounters.totalFiles = 0;
  }

  private _validateChessPiece(
    validationCounters: FenPosition.ValidationCounters
  ): void {
    if (validationCounters.totalFiles + 1 > 8) {
      this._error = FenError.createTooManyPiecesOnRank(
        validationCounters.charIndex,
        validationCounters.totalRanks
      );
      return;
    }

    validationCounters.totalFiles++;
    validationCounters.totalSquares++;
  }

  private _validateEmptySquare(
    char: string,
    validationCounters: FenPosition.ValidationCounters
  ): void {
    const emptySquares = +char;

    if (validationCounters.totalFiles + emptySquares > 8) {
      this._error = FenError.createTooManyEmptySquaresAddedToRank(
        validationCounters.charIndex,
        validationCounters.totalRanks
      );
      return;
    }

    validationCounters.totalFiles += emptySquares;
    validationCounters.totalSquares += emptySquares;
  }
}

// tslint:disable-next-line: no-namespace
export namespace FenPosition {
  export interface ValidationCounters {
    charIndex: number;
    totalRanks: number;
    totalFiles: number;
    totalSquares: number;
  }
}
