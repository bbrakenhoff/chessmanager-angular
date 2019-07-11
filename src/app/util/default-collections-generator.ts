import { Collection } from 'src/models/collection.model';
import { FenPosition } from 'src/models/fen-position.model';

export interface TestData {
  collection: Collection;
  fenPositions: FenPosition[];
}

export const defaultCollections: TestData[] = [
  createTestCollection(),
  createProblemsCollection(),
  createErrorsCollection()
];

function createTestCollection(): TestData {
  const collection = Collection.create('Test collection');

  const startingPosition = new FenPosition();
  startingPosition.notation = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
  startingPosition.description = 'Starting position';
  startingPosition.collectionId = collection.id;

  const emptyBoard = new FenPosition();
  emptyBoard.notation = '8/8/8/8/8/8/8/8';
  emptyBoard.description = 'Empty board';
  emptyBoard.collectionId = collection.id;

  const eightQueensSolution = new FenPosition();
  eightQueensSolution.notation = 'Q7/6Q1/4Q3/7Q/1Q6/3Q4/5Q2/2Q5';
  eightQueensSolution.description = 'Eight queens solution';
  eightQueensSolution.collectionId = collection.id;

  const foolsMate = new FenPosition();
  foolsMate.notation = 'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR';
  foolsMate.description = 'Fool\'s Mate';
  foolsMate.collectionId = collection.id;

  return {
    collection,
    fenPositions: [startingPosition, emptyBoard, eightQueensSolution, foolsMate]
  };
}

function createProblemsCollection(): TestData {
  const collection = Collection.create('Problems');

  const problem1 = new FenPosition();
  problem1.notation = '3r2k1/1p5p/6p1/p2q1p2/P1Q5/1P5P/1P6/5RK1';
  problem1.description = 'White to move & win';
  problem1.collectionId = collection.id;

  const problem2 = new FenPosition();
  problem2.notation = 'r1bq4/1p4kp/3p1n2/5pB1/p1pQ4/8/1P4PP/4RRK1';
  problem2.description = 'White; to; move & win';
  problem2.collectionId = collection.id;

  const problem3 = new FenPosition();
  problem3.notation = 'r2k4/1pp2rpp/pn1b1p2/3n4/8/P4NB1/1PP3PP/2KRR3';
  problem3.description = 'White; to; move & win';
  problem3.collectionId = collection.id;

  const problem4 = new FenPosition();
  problem4.notation = 'r1bqk2r/1pp2ppp/pb1p4/4n3/PPB1P3/2P5/R3QPPP/1NB1R1K1';
  problem4.description = ' Black to move & win';
  problem4.collectionId = collection.id;

  const problem5 = new FenPosition();
  problem5.notation = '2k1r3/2p4p/5b2/1NpK4/4p1bN/1P4P1/P4P2/7R';
  problem5.description = 'Black to move & win';
  problem5.collectionId = collection.id;

  const problem6 = new FenPosition();
  problem6.notation = '1r4k1/prp1ppbp/2b2np1/3P4/2p2B2/2N1PN1P/PP1R1PP1/2K4R';
  problem6.description = 'Black to move & win';
  problem6.collectionId = collection.id;

  return {
    collection,
    fenPositions: [problem1, problem2, problem3, problem4, problem5, problem6]
  };
}

function createErrorsCollection(): TestData {
  const collection = Collection.create('Errors');

  const tooManyPiecesOnRank = new FenPosition();
  tooManyPiecesOnRank.notation = 'rnbqkbnr/pppppppp/8K/8/8/8/PPPPPPPP/RNBQKBNR';
  tooManyPiecesOnRank.description = 'Too many pieces on rank 3';
  tooManyPiecesOnRank.collectionId = collection.id;

  const tooManyEmptySquaresToRank = new FenPosition();
  tooManyEmptySquaresToRank.notation =
    'rnbqkbnr/pppppp3/8/8/8/8/PPPPPPPP/RNBQKBNR';
  tooManyEmptySquaresToRank.description =
    'Too many empty squares added to rank 2';
  tooManyEmptySquaresToRank.collectionId = collection.id;

  const notEnoughSquaresOnRank = new FenPosition();
  notEnoughSquaresOnRank.notation = 'rnbqkbnr/pppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
  notEnoughSquaresOnRank.description = 'Not enough squares defined on rank 2';
  notEnoughSquaresOnRank.collectionId = collection.id;

  const tooManyRanksDefined = new FenPosition();
  tooManyRanksDefined.notation =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR/KQBNRP';
  tooManyRanksDefined.description = 'Too many ranks defined';
  tooManyRanksDefined.collectionId = collection.id;

  const illegalCharacterFound = new FenPosition();
  illegalCharacterFound.notation =
    'rnbXkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
  illegalCharacterFound.description = 'Illegal character found';
  illegalCharacterFound.collectionId = collection.id;

  const notEnoughSquaresDefined = new FenPosition();
  notEnoughSquaresDefined.notation = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQK';
  notEnoughSquaresDefined.description = 'Not enough squares defined';
  notEnoughSquaresDefined.collectionId = collection.id;

  return {
    collection,
    fenPositions: [
      tooManyPiecesOnRank,
      tooManyEmptySquaresToRank,
      notEnoughSquaresOnRank,
      tooManyRanksDefined,
      illegalCharacterFound,
      notEnoughSquaresDefined
    ]
  };
}
