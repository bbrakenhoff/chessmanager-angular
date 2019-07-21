import { FenError } from './fen-error.model';
import { FenCharUtil } from './fen-char-util.model';
import * as uuid from 'uuid/v4';

export class FenDiagram {
  private _id: string = uuid();
  public get id(): string {
    return this._id;
  }

  collectionId = '';
  description = '';

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
  private _error: FenError = null;
  get error(): FenError {
    return this._error;
  }

  get isValid(): boolean {
    return !this.error;
  }

  private constructor() {}

  static create() {
    return new FenDiagram();
  }

  static createFromJson(json: any) {
    const fenDiagram = FenDiagram.create();
    fenDiagram._id = json._id;
    fenDiagram.collectionId = json.collectionId;
    fenDiagram.description = json.description;
    fenDiagram.notation = json._notation;
    return fenDiagram;
  }

  private _validate() {
    // Wrap in vairable, so they can be updated by reference outside this method
    const validationCounters: FenDiagram.ValidationCounters = {
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
    validationCounters: FenDiagram.ValidationCounters
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
    validationCounters: FenDiagram.ValidationCounters
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
    validationCounters: FenDiagram.ValidationCounters
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
export namespace FenDiagram {
  export interface ValidationCounters {
    charIndex: number;
    totalRanks: number;
    totalFiles: number;
    totalSquares: number;
  }
}
