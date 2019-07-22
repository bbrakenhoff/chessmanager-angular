import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { spy, anything, verify, reset } from 'ts-mockito';
import { Collection } from 'src/models/collection.model';
import { IconSet } from 'src/models/icon-set.model';
import { FenDiagram } from 'src/models/fen-diagram.model';
import { GlobalTestDataFactory } from '../util/test-data-factory';

export enum StorageKey {
  PrefIconSet = 'pref_icon_set',
  Collections = 'collections',
  FenDiagrams = 'fen_diagrams'
}

class TestDataFactory {
  static createTestCollections(): Collection[] {
    return GlobalTestDataFactory.createCollectionsWithoutFenDiagrams();
  }

  static createTestCollectionWithFenDiagrams() {
    return GlobalTestDataFactory.createTestCollection();
  }

  static createEndPositionsCollectionWithFenDiagrams() {
    return GlobalTestDataFactory.createProblemsCollection();
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
    const testCollectionWithFenDiagrams = TestDataFactory.createTestCollectionWithFenDiagrams();

    it('should delete the collection when in storage', () => {
      localStorage.setItem(
        StorageKey.Collections,
        JSON.stringify(testCollections)
      );

      storageService.deleteCollection(testCollections[1].id);
      const collections = storageService.getCollections();
      expect(collections).toEqual([testCollections[0], testCollections[2]]);
    });

    it('should delete fen diagrams that belong to collection being deleted', () => {
      localStorage.setItem(
        StorageKey.Collections,
        JSON.stringify([testCollectionWithFenDiagrams.collection])
      );

      localStorage.setItem(
        StorageKey.FenDiagrams,
        JSON.stringify([
          testCollectionWithFenDiagrams.fenDiagrams.startingPosition,
          testCollectionWithFenDiagrams.fenDiagrams.emptyBoard,
          testCollectionWithFenDiagrams.fenDiagrams.eightQueensSolution,
          testCollectionWithFenDiagrams.fenDiagrams.foolsMate
        ])
      );

      storageService.deleteCollection(
        testCollectionWithFenDiagrams.collection.id
      );
      const fenDiagrams = storageService.getFenDiagramsByCollectionId(
        testCollectionWithFenDiagrams.collection.id
      );
      expect(fenDiagrams).toEqual([]);
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

  describe('deleteFenDiagram(fenDiagramId: string)', () => {
    const testCollection = TestDataFactory.createTestCollectionWithFenDiagrams();
    it('should delete the fen diagram with the given id', () => {
      localStorage.setItem(
        StorageKey.FenDiagrams,
        JSON.stringify([
          testCollection.fenDiagrams.startingPosition,
          testCollection.fenDiagrams.emptyBoard,
          testCollection.fenDiagrams.eightQueensSolution,
          testCollection.fenDiagrams.foolsMate
        ])
      );

      storageService.deleteFenDiagram(
        testCollection.fenDiagrams.eightQueensSolution.id
      );
      const fenDiagrams = localStorage.getItem(StorageKey.FenDiagrams);
      expect(fenDiagrams).toEqual(
        JSON.stringify([
          testCollection.fenDiagrams.startingPosition,
          testCollection.fenDiagrams.emptyBoard,
          testCollection.fenDiagrams.foolsMate
        ])
      );
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
