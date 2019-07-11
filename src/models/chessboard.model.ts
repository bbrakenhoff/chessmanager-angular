import { ChessSquare } from './square.model';
import { ChessColor } from './color.model';
import { FenPosition } from './fen-position.model';
import { FenCharUtil } from './fen-char-util.model';
import { ChessPiece } from './piece.model';

export class Chessboard {
  squares: ChessSquare[][];

  private constructor() {
    this._initSquares();
  }

  static create() {
    return new Chessboard();
  }

  private _initSquares() {
    this.squares = [];

    for (let r = 0; r < 8; r++) {
      const rank: ChessSquare[] = [];

      for (let f = 0; f < 8; f++) {
        const color = (r + f) % 2 === 0 ? ChessColor.White : ChessColor.Black;
        rank.push(ChessSquare.create(color));
      }

      this.squares.push(rank);
    }
  }

  reflectFenPosition(fenPosition: FenPosition) {
    const charIndex = this._reflectionCharIndex(fenPosition);

    let r = 0;
    let f = 0;
    let i = 0;

    while (i < charIndex) {
      const char = fenPosition.notation.charAt(i);
      if (FenCharUtil.charRepresentsNewRank(char)) {
        r++;
        f = 0;
      } else if (FenCharUtil.charRepresentsChessPiece(char)) {
        this.squares[r][f].piece = ChessPiece.createFromFenChar(char);
        f++;
      } else if (FenCharUtil.charRepresentsEmptySquare(char)) {
        const emptySquares = +char;

        for (let j = 0; j < emptySquares; j++) {
          this.squares[r][f].piece = null;
          f++;
        }
      }

      i++;
    }

    if (!fenPosition.isValid) {
      this._clearRemainingSquares(r, f);
    }
  }

  private _reflectionCharIndex(fenPosition: FenPosition): number {
    return fenPosition.isValid
      ? fenPosition.notation.length
      : fenPosition.error.position;
  }

  private _clearRemainingSquares(rank: number, file: number): void {
    if (file >= 7) {
      file = 0;
      rank++;
    }

    while (rank < 8) {
      this.squares[rank][file].piece = null;

      if (file === 7) {
        file = 0;
        rank++;
      } else {
        file++;
      }
    }
  }
}
