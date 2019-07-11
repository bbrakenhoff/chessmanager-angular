import { ChessSquare } from './square.model';
import { ChessColor } from './color.model';

describe('ChessSquare', () => {

  it('static create(color: ChessColor)', () => {
    const result = ChessSquare.create(ChessColor.Black);
    expect(result.color).toEqual(ChessColor.Black);
    expect(result.piece).toBeNull();
  });
});
