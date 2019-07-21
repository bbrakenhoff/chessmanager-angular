import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { spy, when, anything, verify, reset } from 'ts-mockito';
import { Collection } from 'src/models/collection.model';
import { IconSet } from 'src/models/icon-set.model';
import { TestCollection } from '../util/test-data-factory';
import { FenDiagram } from 'src/models/fen-diagram.model';

export enum StorageKey {
  PrefIconSet = 'pref_icon_set',
  Collections = 'collections',
  FenDiagrams = 'fen_diagrams'
}

class TestDataFactory {
  static createTestCollections(): Collection[] {
    return [
      Collection.create('Test collection'),
      Collection.create('Problems'),
      Collection.create('Errors')
    ];
  }

  static createTestCollectionWithFenDiagrams() {
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

  static createEndPositionsCollectionWithFenDiagrams() {
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
}

describe('StorageService', () => {
  const localStorageSpy: Storage = spy(localStorage);

  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    storageService = TestBed.get(StorageService);
  });

  afterEach(() => {
    reset(localStorageSpy);
    localStorage.clear();
  });

  describe('getCollections(): Collection[]', () => {
    const testCollections = TestDataFactory.createTestCollections();

    it('should return the collections from storage when in storage', () => {
      localStorage.setItem(
        StorageKey.Collections,
        JSON.stringify(testCollections)
      );
      expect(storageService.getCollections()).toEqual(testCollections);
    });

    it('should return an empty array when nothing in storage', () => {
      expect(storageService.getCollections()).toEqual([]);
    });
  });

  describe('getCollectionById(collectionId: string): Collection', () => {
    const testCollections = TestDataFactory.createTestCollections();

    it('should return the collecction with the given id when found', () => {
      localStorage.setItem(
        StorageKey.Collections,
        JSON.stringify(testCollections)
      );

      const collection = storageService.getCollectionById(
        testCollections[0].id
      );
      expect(collection).toEqual(testCollections[0]);
    });

    it('should return null when fen diagram cannot be found', () => {
      const collection = storageService.getCollectionById(
        testCollections[0].id
      );
      expect(collection).toBeUndefined();
    });
  });

  describe('saveCollection(collection: Collection)', () => {
    const testCollections = TestDataFactory.createTestCollections();
    const newTestCollection = Collection.create('New collection');

    it('should save the collection when storage is empty', () => {
      storageService.saveCollection(newTestCollection);

      const collections = storageService.getCollections();
      expect(collections).toEqual([newTestCollection]);
    });

    it('should save the collection when not in storage yet', () => {
      localStorage.setItem(
        StorageKey.Collections,
        JSON.stringify(testCollections)
      );

      storageService.saveCollection(newTestCollection);

      const collections = storageService.getCollections();
      expect(collections).toEqual([...testCollections, ...[newTestCollection]]);
    });

    it('should replace the collection when in storage', () => {
      localStorage.setItem(
        StorageKey.Collections,
        JSON.stringify(testCollections)
      );

      testCollections[0].name = 'Other name';
      storageService.saveCollection(testCollections[0]);

      const collections = storageService.getCollections();
      expect(collections).toEqual(testCollections);
    });

    it('should do nothing when undefined is given', () => {
      localStorage.setItem(
        StorageKey.Collections,
        JSON.stringify(testCollections)
      );

      storageService.saveCollection(undefined);

      const collections = storageService.getCollections();
      expect(collections).toEqual(testCollections);
      verify(
        localStorageSpy.setItem(StorageKey.Collections, anything())
      ).never();
    });
  });

  describe('deleteCollection(collection: Collection)', () => {
    const testCollections = TestDataFactory.createTestCollections();

    it('should delete the collection when in storage', () => {
      localStorage.setItem(
        StorageKey.Collections,
        JSON.stringify(testCollections)
      );

      storageService.deleteCollection(testCollections[1].id);
      const collections = storageService.getCollections();
      expect(collections).toEqual([testCollections[0], testCollections[2]]);
    });
  });

  describe('getFenDiagramsByCollection(collectionId: string): FenDiagram[]', () => {
    const testCollection = TestDataFactory.createTestCollectionWithFenDiagrams();
    const endPositionsTestCollection = TestDataFactory.createEndPositionsCollectionWithFenDiagrams();

    beforeEach(() => {
      localStorage.setItem(
        StorageKey.FenDiagrams,
        JSON.stringify([
          testCollection.fenDiagrams.startingPosition,
          testCollection.fenDiagrams.foolsMate,
          testCollection.fenDiagrams.eightQueensSolution,
          testCollection.fenDiagrams.emptyBoard,
          endPositionsTestCollection.fenDiagrams.problem1,
          endPositionsTestCollection.fenDiagrams.problem2,
          endPositionsTestCollection.fenDiagrams.problem3,
          endPositionsTestCollection.fenDiagrams.problem4,
          endPositionsTestCollection.fenDiagrams.problem5,
          endPositionsTestCollection.fenDiagrams.problem6
        ])
      );
    });

    it('should get the fen diagrams with given collection id when in storage', () => {
      const fenDiagrams = storageService.getFenDiagramsByCollectionId(
        testCollection.collection.id
      );
      expect(fenDiagrams).toEqual([
        testCollection.fenDiagrams.startingPosition,
        testCollection.fenDiagrams.foolsMate,
        testCollection.fenDiagrams.eightQueensSolution,
        testCollection.fenDiagrams.emptyBoard
      ]);
    });

    it('should return an empty array when nothing found', () => {
      const newCollection = Collection.create('New collection');
      const fenDiagrams = storageService.getFenDiagramsByCollectionId(
        newCollection.id
      );
      expect(fenDiagrams).toEqual([]);
    });
  });

  describe('getFenDiagramById(fenDiagramId:string): FenDiagram', () => {
    const testCollection = TestDataFactory.createTestCollectionWithFenDiagrams();

    beforeEach(() => {
      localStorage.setItem(
        StorageKey.FenDiagrams,
        JSON.stringify([
          testCollection.fenDiagrams.startingPosition,
          testCollection.fenDiagrams.foolsMate,
          testCollection.fenDiagrams.eightQueensSolution,
          testCollection.fenDiagrams.emptyBoard
        ])
      );
    });

    it('should return the fen diagram with the given id when found', () => {
      const fenDiagram = storageService.getFenDiagramById(
        testCollection.fenDiagrams.eightQueensSolution.id
      );
      expect(fenDiagram).toEqual(
        testCollection.fenDiagrams.eightQueensSolution
      );
    });

    it('should return undefined when fen diagram cannot be found', () => {
      const fenDiagram = storageService.getFenDiagramById(
        FenDiagram.create().id
      );
      expect(fenDiagram).toBeUndefined();
    });
  });

  describe('saveFenDiagram(fenDiagram: FenDiagram)', () => {
    const testCollection = TestDataFactory.createTestCollectionWithFenDiagrams();

    it('should save the fen diagram when storage is empty', () => {
      storageService.saveFenDiagram(
        testCollection.fenDiagrams.eightQueensSolution
      );

      const fenDiagram = storageService.getFenDiagramById(
        testCollection.fenDiagrams.eightQueensSolution.id
      );
      expect(fenDiagram).toEqual(
        testCollection.fenDiagrams.eightQueensSolution
      );
    });

    it('should save the fen diagram when not in storage yet', () => {
      localStorage.setItem(
        StorageKey.FenDiagrams,
        JSON.stringify([
          testCollection.fenDiagrams.startingPosition,
          testCollection.fenDiagrams.emptyBoard,
          testCollection.fenDiagrams.foolsMate
        ])
      );

      storageService.saveFenDiagram(
        testCollection.fenDiagrams.eightQueensSolution
      );

      const fenDiagrams = storageService.getFenDiagramsByCollectionId(
        testCollection.collection.id
      );
      expect(fenDiagrams).toEqual([
        testCollection.fenDiagrams.startingPosition,
        testCollection.fenDiagrams.emptyBoard,
        testCollection.fenDiagrams.foolsMate,
        testCollection.fenDiagrams.eightQueensSolution
      ]);
    });

    it('should replace the fen diagram when in storage', () => {
      localStorage.setItem(
        StorageKey.FenDiagrams,
        JSON.stringify([
          testCollection.fenDiagrams.startingPosition,
          testCollection.fenDiagrams.emptyBoard,
          testCollection.fenDiagrams.foolsMate,
          testCollection.fenDiagrams.eightQueensSolution
        ])
      );

      testCollection.fenDiagrams.emptyBoard.notation =
        testCollection.fenDiagrams.eightQueensSolution.notation;

      storageService.saveFenDiagram(testCollection.fenDiagrams.emptyBoard);

      const fenDiagrams = storageService.getFenDiagramsByCollectionId(
        testCollection.collection.id
      );
      expect(fenDiagrams).toEqual([
        testCollection.fenDiagrams.startingPosition,
        testCollection.fenDiagrams.emptyBoard,
        testCollection.fenDiagrams.foolsMate,
        testCollection.fenDiagrams.eightQueensSolution
      ]);
    });

    it('should do nothing when undefined is given', () => {
      localStorage.setItem(
        StorageKey.FenDiagrams,
        JSON.stringify([
          testCollection.fenDiagrams.startingPosition,
          testCollection.fenDiagrams.emptyBoard,
          testCollection.fenDiagrams.foolsMate,
          testCollection.fenDiagrams.eightQueensSolution
        ])
      );
      reset(localStorageSpy);

      storageService.saveFenDiagram(undefined);

      const fenDiagrams = storageService.getFenDiagramsByCollectionId(
        testCollection.collection.id
      );
      expect(fenDiagrams).toEqual([
        testCollection.fenDiagrams.startingPosition,
        testCollection.fenDiagrams.emptyBoard,
        testCollection.fenDiagrams.foolsMate,
        testCollection.fenDiagrams.eightQueensSolution
      ]);
      verify(
        localStorageSpy.setItem(StorageKey.FenDiagrams, anything())
      ).never();
    });
  });
  describe('getIconSet()', () => {
    it('should return the stored icon set when in storage', () => {
      localStorage.setItem(StorageKey.PrefIconSet, IconSet.Leipzig);
      expect(storageService.getIconSet()).toEqual(IconSet.Leipzig);
    });

    it('should return the default icon set IconSet.Alpha when nothing in storage', () => {
      expect(storageService.getIconSet()).toEqual(IconSet.Alpha);
    });
  });

  describe('saveIconSet(iconSet: IconSet)', () => {
    it('should store the given value', () => {
      storageService.saveIconSet(IconSet.Leipzig);
      expect(storageService.getIconSet()).toEqual(IconSet.Leipzig);
    });
  });
});
