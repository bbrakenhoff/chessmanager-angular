import { Collection } from 'src/models/collection.model';
import { FenDiagram } from '../../models/fen-diagram.model';

export interface TestCollection {
  collection: Collection;
  fenDiagrams: FenDiagram[];
}

export class GlobalTestDataFactory {

  static createCollectionsWithoutFenDiagrams() {
    return [
      Collection.create('Test collection'),
      Collection.create('Problems'),
      Collection.create('Errors')
    ];
  }

  static createFenNotations() {
    return {
      emptyBoard: '8/8/8/8/8/8/8/8',
      startingPosition: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
      tooManyPiecesOnRank: 'rnbqkbnr/pppppppp/8K/8/8/8/PPPPPPPP/RNBQKBNR',
      tooManyEmptySquaresToRank: 'rnbqkbnr/pppppp3/8/8/8/8/PPPPPPPP/RNBQKBNR',
      notEnoughSquaresOnRank: 'rnbqkbnr/pppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
      tooManyRanksDefined: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR/KQBNRP',
      illegalCharacterFound: 'rnbXkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
      notEnoughSquaresDefined: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQK',
      eightQueensSolution: 'Q7/6Q1/4Q3/7Q/1Q6/3Q4/5Q2/2Q5',
      foolsMate: 'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR'
    };
  }

  static createTestCollection() {
    const collection = Collection.create('Test collection');

    const startingPosition = FenDiagram.create();
    startingPosition.notation = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    startingPosition.description = 'Starting position';
    startingPosition.collectionId = collection.id;

    const emptyBoard = FenDiagram.create();
    emptyBoard.notation = '8/8/8/8/8/8/8/8';
    emptyBoard.description = 'Empty board';
    emptyBoard.collectionId = collection.id;

    const eightQueensSolution = FenDiagram.create();
    eightQueensSolution.notation = 'Q7/6Q1/4Q3/7Q/1Q6/3Q4/5Q2/2Q5';
    eightQueensSolution.description = 'Eight queens solution';
    eightQueensSolution.collectionId = collection.id;

    const foolsMate = FenDiagram.create();
    foolsMate.notation = 'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR';
    foolsMate.description = 'Fool\'s Mate';
    foolsMate.collectionId = collection.id;

    return {
      collection,
      fenDiagrams: {
        startingPosition,
        emptyBoard,
        eightQueensSolution,
        foolsMate
      }
    };
  }

  static createProblemsCollection() {
    const collection = Collection.create('Problems');

    const problem1 = FenDiagram.create();
    problem1.notation = '3r2k1/1p5p/6p1/p2q1p2/P1Q5/1P5P/1P6/5RK1';
    problem1.description = 'White to move & win';
    problem1.collectionId = collection.id;

    const problem2 = FenDiagram.create();
    problem2.notation = 'r1bq4/1p4kp/3p1n2/5pB1/p1pQ4/8/1P4PP/4RRK1';
    problem2.description = 'White; to; move & win';
    problem2.collectionId = collection.id;

    const problem3 = FenDiagram.create();
    problem3.notation = 'r2k4/1pp2rpp/pn1b1p2/3n4/8/P4NB1/1PP3PP/2KRR3';
    problem3.description = 'White; to; move & win';
    problem3.collectionId = collection.id;

    const problem4 = FenDiagram.create();
    problem4.notation = 'r1bqk2r/1pp2ppp/pb1p4/4n3/PPB1P3/2P5/R3QPPP/1NB1R1K1';
    problem4.description = ' Black to move & win';
    problem4.collectionId = collection.id;

    const problem5 = FenDiagram.create();
    problem5.notation = '2k1r3/2p4p/5b2/1NpK4/4p1bN/1P4P1/P4P2/7R';
    problem5.description = 'Black to move & win';
    problem5.collectionId = collection.id;

    const problem6 = FenDiagram.create();
    problem6.notation = '1r4k1/prp1ppbp/2b2np1/3P4/2p2B2/2N1PN1P/PP1R1PP1/2K4R';
    problem6.description = 'Black to move & win';
    problem6.collectionId = collection.id;

    return {
      collection,
      fenDiagrams: {
        problem1,
        problem2,
        problem3,
        problem4,
        problem5,
        problem6
      }
    };
  }

  static createErrorsCollection() {
    const collection = Collection.create('Errors');

    const tooManyPiecesOnRank = FenDiagram.create();
    tooManyPiecesOnRank.notation =
      'rnbqkbnr/pppppppp/8K/8/8/8/PPPPPPPP/RNBQKBNR';
    tooManyPiecesOnRank.description = 'Too many pieces on rank 3';
    tooManyPiecesOnRank.collectionId = collection.id;

    const tooManyEmptySquaresToRank = FenDiagram.create();
    tooManyEmptySquaresToRank.notation =
      'rnbqkbnr/pppppp3/8/8/8/8/PPPPPPPP/RNBQKBNR';
    tooManyEmptySquaresToRank.description =
      'Too many empty squares added to rank 2';
    tooManyEmptySquaresToRank.collectionId = collection.id;

    const notEnoughSquaresOnRank = FenDiagram.create();
    notEnoughSquaresOnRank.notation =
      'rnbqkbnr/pppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    notEnoughSquaresOnRank.description = 'Not enough squares defined on rank 2';
    notEnoughSquaresOnRank.collectionId = collection.id;

    const tooManyRanksDefined = FenDiagram.create();
    tooManyRanksDefined.notation =
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR/KQBNRP';
    tooManyRanksDefined.description = 'Too many ranks defined';
    tooManyRanksDefined.collectionId = collection.id;

    const illegalCharacterFound = FenDiagram.create();
    illegalCharacterFound.notation =
      'rnbXkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    illegalCharacterFound.description = 'Illegal character found';
    illegalCharacterFound.collectionId = collection.id;

    const notEnoughSquaresDefined = FenDiagram.create();
    notEnoughSquaresDefined.notation =
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQK';
    notEnoughSquaresDefined.description = 'Not enough squares defined';
    notEnoughSquaresDefined.collectionId = collection.id;

    return {
      collection,
      fenDiagrams: {
        tooManyPiecesOnRank,
        tooManyEmptySquaresToRank,
        notEnoughSquaresOnRank,
        tooManyRanksDefined,
        illegalCharacterFound,
        notEnoughSquaresDefined
      }
    };
  }
}
