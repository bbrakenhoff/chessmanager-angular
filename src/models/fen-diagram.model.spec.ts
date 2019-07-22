import { FenDiagram } from './fen-diagram.model';
import { FenError } from './fen-error.model';
import { TestDataFactory } from 'src/app/util/test-data-factory';

describe('FenDiagram', () => {
  const testFenNotations = TestDataFactory.createFenNotations();

  describe('static create()', () => {
    it('should create a new fen diagram', () => {
      const fenDiagram: FenDiagram = FenDiagram.create();
      expect(fenDiagram).toBeDefined();
      expect(fenDiagram.id).toBeDefined();
      expect(fenDiagram.id).not.toEqual('');
      expect(fenDiagram.description).toEqual('');
      expect(fenDiagram.collectionId).toEqual('');
      expect(fenDiagram.notation).toEqual('');
      expect(fenDiagram.error).toBeNull();
    });
  });

  describe('static createFromJson(json: any)', () => {
    it('should create a fen diagram from JSON', () => {
      const json = {
        collectionId: 'fb1b177a-8088-4ce6-8666-d36284a195e1',
        description: 'Illegal character found',
        _id: 'ffe2e91f-277d-4ffe-baee-c1a84c36d0fb',
        _error: null,
        _notation: 'rnbXkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
      };

      const fenDiagram = FenDiagram.createFromJson(json);
      expect(fenDiagram).toBeDefined();
      expect(fenDiagram.id).toEqual(json._id);
      expect(fenDiagram.collectionId).toEqual(json.collectionId);
      expect(fenDiagram.description).toEqual(json.description);
      expect(fenDiagram.notation).toEqual(json._notation);
      expect(fenDiagram.isValid).toEqual(false);
    });
  });

  describe('get isValid()', () => {
    let fenDiagram: FenDiagram;

    beforeEach(() => {
      fenDiagram = FenDiagram.create();
    });

    describe('valid', () => {
      it('should not result in an error when empty board represented', () => {
        fenDiagram.notation = testFenNotations.emptyBoard;
        expect(fenDiagram.error).toBeNull();
        expect(fenDiagram.isValid).toEqual(true);
      });

      it('should not result in an error when starting position represented', () => {
        fenDiagram.notation = testFenNotations.startingPosition;
        expect(fenDiagram.error).toBeNull();
        expect(fenDiagram.isValid).toEqual(true);
      });
    });

    describe('invalid', () => {

      it('should result in an error when too many pieces on a rank', () => {
        fenDiagram.notation = testFenNotations.tooManyPiecesOnRank;
        expect(fenDiagram.error).toEqual(FenError.createTooManyPiecesOnRank(19, 2));
        expect(fenDiagram.isValid).toEqual(false);
      });

      it('should result in an error when too many empty squares added to a rank', () => {
        fenDiagram.notation = testFenNotations.tooManyEmptySquaresToRank;
        expect(fenDiagram.error).toEqual(
          FenError.createTooManyEmptySquaresAddedToRank(15, 1)
        );
        expect(fenDiagram.isValid).toEqual(false);
      });

      it('should result in an error when not enough squares defined on a rank', () => {
        fenDiagram.notation = testFenNotations.notEnoughSquaresOnRank;
        expect(fenDiagram.error).toEqual(
          FenError.createNotEnoughSquaresOnRank(15, 1)
        );
        expect(fenDiagram.isValid).toEqual(false);
      });

      it('should result in an error when when too many ranks defined', () => {
        fenDiagram.notation = testFenNotations.tooManyRanksDefined;
        expect(fenDiagram.error).toEqual(FenError.createTooManyRanksDefined(43));
        expect(fenDiagram.isValid).toEqual(false);
      });

      it('should result in an error when illegal character found', () => {
        fenDiagram.notation = testFenNotations.illegalCharacterFound;
        expect(fenDiagram.error).toEqual(FenError.createIllegalCharacterFound(3));
        expect(fenDiagram.isValid).toEqual(false);
      });

      it('should result in an error when not enough squares defined', () => {
        fenDiagram.notation = testFenNotations.notEnoughSquaresDefined;
        expect(fenDiagram.error).toEqual(
          FenError.createNotEnoughSquaresDefined(39)
        );
        expect(fenDiagram.isValid).toEqual(false);
      });
    });
  });
});
