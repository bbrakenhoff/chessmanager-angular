import { ChessSquare } from './square.model';
import { ChessColor } from './color.model';

describe('ChessSquare', () => {

  it('constructor(color: ChessColor)', () => {
    const result = new ChessSquare(ChessColor.Black);
    expect(result.color).toEqual(ChessColor.Black);
    expect(result.piece).toBeNull();
  });
});
