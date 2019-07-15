import { TestBed } from '@angular/core/testing';

import { StorageService, StorageKey } from './storage.service';
import {
  spy,
  anyString,
  when,
  verify,
  resetCalls,
  anything
} from 'ts-mockito';
import { IconSet } from 'src/models/icon-set.model';
import { Collection } from 'src/models/collection.model';
import { FenDiagram } from 'src/models/fen-diagram.model';
import { TestDataFactory } from '../util/test-data-factory';

describe('StorageService', () => {
  const testData = {
    storageStringValue: TestDataFactory.createString(),
    storageJsonValue: TestDataFactory.createJson(),
    collectionsJsonArray: TestDataFactory.createCollectionsJson(),
    collections: TestDataFactory.createCollections(),
    collection: TestDataFactory.createTestCollection(),
    collectionsWithFenDiagrams: TestDataFactory.createAllTestCollections(),
    fenDiagramsJsonArray: TestDataFactory.createFenDiagramsJson(),
    fenDiagrams: TestDataFactory.createFenDiagrams()
  };

  const localStorageSpy: Storage = spy(localStorage);
  let storageServiceSpy: StorageService;

  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    storageService = TestBed.get(StorageService);
    storageServiceSpy = spy(storageService);
  });

  afterEach(() => {
    resetCalls(localStorageSpy);
  });

  describe('getCollectionById(fenDiagramId: string)', () => {
    it('should return the collecction with the given id when found', () => {
      when((storageServiceSpy as any)._get(anyString())).thenReturn(
        testData.collections
      );
      const collection = storageService.getCollectionById(
        testData.collections[0].id
      );
      expect(collection).toEqual(testData.collections[0]);
    });

    it('should return null when fen diagram cannot be found', () => {
      when((storageServiceSpy as any)._get(anyString())).thenReturn(undefined);
      const collection = storageService.getCollectionById(
        testData.collections[0].id
      );
      expect(collection).toBeNull();
    });
  });

  describe('get collections()', () => {
    it('should return the collections from storage when in storage', () => {
      const CollectionSpy = spy(Collection);

      when((storageServiceSpy as any)._get(anyString())).thenReturn(
        testData.collectionsJsonArray
      );
      const collections = storageService.collections;
      expect(collections).toBeDefined();
      expect(collections.length).toEqual(3);
      verify(CollectionSpy.createFromJson(anything())).thrice();
      verify((storageServiceSpy as any)._get(StorageKey.Collections)).once();
    });

    it('should return an empty array when nothing in storage', () => {
      when((storageServiceSpy as any)._get(anyString())).thenReturn(undefined);
      expect(storageService.collections).toEqual([]);
      verify((storageServiceSpy as any)._get(StorageKey.Collections)).once();
    });
  });

  describe('setCollections(value: Collection[])', () => {
    it('should store the given values', () => {
      const collections = testData.collections;
      storageService.setCollections(collections);

      verify(
        (storageServiceSpy as any)._set(StorageKey.Collections, collections)
      );
    });
  });

  describe('getFenDiagramsByCollection(collectionId: string)', () => {
    it('should find the fen diagrams belonging to the given collection', () => {
      const collectionId =
        testData.collectionsWithFenDiagrams.testCollection.collection.id;
      when((storageServiceSpy as any)._fenDiagrams).thenReturn([
        ...testData.collectionsWithFenDiagrams.testCollection.fenDiagrams,
        ...testData.collectionsWithFenDiagrams.errorsCollection.fenDiagrams
      ]);

      const fenDiagrams = storageService.getFenDiagramsByCollection(
        collectionId
      );
      expect(fenDiagrams).toEqual(
        testData.collectionsWithFenDiagrams.testCollection.fenDiagrams
      );
    });
  });

  describe('getFenDiagramById(fenDiagramId: string)', () => {
    it('should return the fen diagram with the given id when found', () => {
      when((storageServiceSpy as any)._get(anyString())).thenReturn(
        testData.fenDiagrams
      );
      const fenDiagram = storageService.getFenDiagramById(
        testData.fenDiagrams[0].id
      );
      expect(fenDiagram).toEqual(testData.fenDiagrams[0]);
    });

    it('should return null when fen diagram cannot be found', () => {
      when((storageServiceSpy as any)._get(anyString())).thenReturn(undefined);
      const fenDiagram = storageService.getFenDiagramById(
        testData.fenDiagrams[0].id
      );
      expect(fenDiagram).toBeNull();
    });
  });

  describe('get _fenDiagrams()', () => {
    it('should return the fen diagrams from storage when in storage', () => {
      const FenDiagramSpy = spy(FenDiagram);

      when((storageServiceSpy as any)._get(anyString())).thenReturn(
        testData.fenDiagramsJsonArray
      );
      const fenDiagrams = (storageService as any)._fenDiagrams;
      expect(fenDiagrams).toBeDefined();
      expect(fenDiagrams.length).toEqual(3);
      verify(FenDiagramSpy.createFromJson(anything())).thrice();
      verify((storageServiceSpy as any)._get(StorageKey.FenDiagrams)).once();
    });

    it('should return an empty array when nothing in storage', () => {
      when((storageServiceSpy as any)._get(anyString())).thenReturn(undefined);
      expect((storageService as any)._fenDiagrams).toEqual([]);
      verify((storageServiceSpy as any)._get(StorageKey.FenDiagrams)).once();
    });
  });

  describe('setFenDiagrams(value: FenDiagram[])', () => {
    it('should store the given values', () => {
      const fenDiagrams = testData.fenDiagrams;
      storageService.setFenDiagrams(fenDiagrams);

      verify(
        (storageServiceSpy as any)._set(StorageKey.FenDiagrams, fenDiagrams)
      );
    });
  });

  describe('get iconSet()', () => {
    it('should return the stored icon set when in storage', () => {
      when((storageServiceSpy as any)._get(anyString())).thenReturn(
        IconSet.Maya
      );

      expect(storageService.iconSet).toEqual(IconSet.Maya);
      verify((storageServiceSpy as any)._get(StorageKey.PrefIconSet)).once();
    });

    it('should return the default icon set IconSet.Alpha when nothing in storage', () => {
      when((storageServiceSpy as any)._get(anyString())).thenReturn(null);

      expect(storageService.iconSet).toEqual(IconSet.Alpha);
      verify((storageServiceSpy as any)._get(StorageKey.PrefIconSet)).once();
    });
  });

  describe('setIconSet(value: IconSet)', () => {
    it('should store the given value', () => {
      storageService.setIconSet(IconSet.Maya);

      verify(
        (storageServiceSpy as any)._set(StorageKey.PrefIconSet, IconSet.Maya)
      ).once();
    });
  });

  describe('_get(key: StorageKey): any', () => {
    it('should retrieve the value matching with the given key', () => {
      when(localStorageSpy.getItem(anyString())).thenReturn(
        testData.storageJsonValue
      );

      const value = (storageService as any)._get(StorageKey.PrefIconSet);
      verify(localStorageSpy.getItem(StorageKey.PrefIconSet)).once();
      expect(value).toEqual(JSON.parse(testData.storageJsonValue));
    });

    it('should return a string when the value being returned cannot be parsed to JSON', () => {
      when(localStorageSpy.getItem(anyString())).thenReturn(
        testData.storageStringValue
      );

      const value = (storageService as any)._get(StorageKey.PrefIconSet);
      verify(localStorageSpy.getItem(StorageKey.PrefIconSet)).once();
      expect(value).toEqual(testData.storageStringValue);
    });
  });

  describe('_set(key: StorageKey, value: any)', () => {
    it('should save the new value under the given key', () => {
      (storageService as any)._set(
        StorageKey.PrefIconSet,
        testData.storageStringValue
      );
      verify(
        localStorageSpy.setItem(
          StorageKey.PrefIconSet,
          JSON.stringify(testData.storageStringValue)
        )
      ).once();
    });
  });
});
