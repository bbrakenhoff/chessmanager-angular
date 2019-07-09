import { Collection } from 'src/models/collection.model';
import { FenPosition } from 'src/models/fen-position.model';

export const defaultCollections: Collection[] = [
  createTestCollection(),
  createProblemsCollection(),
  createErrorsCollection(),
];

function createTestCollection() {
  const collection = new Collection();

  const startingPosition = new FenPosition();
  startingPosition.notation = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
  startingPosition.description = 'Starting position';
  collection.fenPositions.push(startingPosition);

  const emptyBoard = new FenPosition();
  emptyBoard.notation = '8/8/8/8/8/8/8/8';
  emptyBoard.description = 'Empty board';
  collection.fenPositions.push(emptyBoard);

  const foolsMate = new FenPosition();
  foolsMate.notation = 'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR';
  foolsMate.description = 'Fool\'s Mate';
  collection.fenPositions.push(foolsMate);

  return collection;
}

function createProblemsCollection() {
  const collection = new Collection();
  collection.name = 'Problems';

  const problem1 = new FenPosition();
  problem1.notation = '3r2k1/1p5p/6p1/p2q1p2/P1Q5/1P5P/1P6/5RK1';
  problem1.description = 'White to move & win';
  collection.fenPositions.push(problem1);

  const problem2 = new FenPosition();
  problem2.notation = 'r1bq4/1p4kp/3p1n2/5pB1/p1pQ4/8/1P4PP/4RRK1';
  problem2.description = 'White; to; move & win';
  collection.fenPositions.push(problem2);

  const problem3 = new FenPosition();
  problem3.notation = 'r2k4/1pp2rpp/pn1b1p2/3n4/8/P4NB1/1PP3PP/2KRR3';
  problem3.description = 'White; to; move & win';
  collection.fenPositions.push(problem3);

  const problem4 = new FenPosition();
  problem4.notation = 'r1bqk2r/1pp2ppp/pb1p4/4n3/PPB1P3/2P5/R3QPPP/1NB1R1K1';
  problem4.description = ' Black to move & win';
  collection.fenPositions.push(problem4);

  const problem5 = new FenPosition();
  problem5.notation = '2k1r3/2p4p/5b2/1NpK4/4p1bN/1P4P1/P4P2/7R';
  problem5.description = 'Black to move & win';
  collection.fenPositions.push(problem5);

  const problem6 = new FenPosition();
  problem6.notation = '1r4k1/prp1ppbp/2b2np1/3P4/2p2B2/2N1PN1P/PP1R1PP1/2K4R';
  problem6.description = 'Black to move & win';
  collection.fenPositions.push(problem6);

  return collection;
}

function createErrorsCollection() {
  const collection = new Collection();
  collection.name = 'Errors';

  const tooManyPiecesOnRank = new FenPosition();
  tooManyPiecesOnRank.notation = 'rnbqkbnr/pppppppp/8K/8/8/8/PPPPPPPP/RNBQKBNR';
  tooManyPiecesOnRank.description = 'Too many pieces on rank 3';
  collection.fenPositions.push(tooManyPiecesOnRank);

  const tooManyEmptySquaresToRank = new FenPosition();
  tooManyEmptySquaresToRank.notation = 'rnbqkbnr/pppppp3/8/8/8/8/PPPPPPPP/RNBQKBNR';
  tooManyEmptySquaresToRank.description = 'Too many empty squares added to rank 2';
  collection.fenPositions.push(tooManyEmptySquaresToRank);

  const notEnoughSquaresOnRank = new FenPosition();
  notEnoughSquaresOnRank.notation = 'rnbqkbnr/pppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
  notEnoughSquaresOnRank.description = 'Not enough squares defined on rank 2';
  collection.fenPositions.push(notEnoughSquaresOnRank);

  const tooManyRanksDefined = new FenPosition();
  tooManyRanksDefined.notation = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR/KQBNRP';
  tooManyRanksDefined.description = 'Too many ranks defined';
  collection.fenPositions.push(tooManyRanksDefined);

  const illegalCharacterFound = new FenPosition();
  illegalCharacterFound.notation = 'rnbXkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
  illegalCharacterFound.description = 'Illegal character found';
  collection.fenPositions.push(illegalCharacterFound);

  const notEnoughSquaresDefined = new FenPosition();
  notEnoughSquaresDefined.notation = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQK';
  notEnoughSquaresDefined.description = 'Not enough squares defined';
  collection.fenPositions.push(notEnoughSquaresDefined);

  return collection;
}
