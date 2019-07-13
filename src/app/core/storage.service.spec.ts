import { TestBed } from '@angular/core/testing';

import { StorageService, StorageKey } from './storage.service';
import {
  spy,
  anyString,
  when,
  verify,
  resetCalls,
  reset,
  anything
} from 'ts-mockito';
import { IconSet } from 'src/models/icon-set.model';
import { Collection } from 'src/models/collection.model';
import { FenPosition } from 'src/models/fen-position.model';
import { TestDataFactory } from '../util/test-data-factory';

describe('StorageService', () => {
  const testData = {
    storageStringValue: TestDataFactory.createString(),
    storageJsonValue: TestDataFactory.createJson(),
    collectionsJsonArray: TestDataFactory.createCollectionsJson(),
    collections: TestDataFactory.createCollections(),
    collection: TestDataFactory.createTestCollection(),
    collectionsWithFenPositions: TestDataFactory.createAllTestCollections(),
    fenPositionsJsonArray: TestDataFactory.createFenPositionsJson(),
    fenPositions: TestDataFactory.createFenPositions()
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

  describe('getFenPositionsByCollection(collectionId: string)', () => {
    it('should find the fen positions belonging to the given collection', () => {
      const collectionId =
        testData.collectionsWithFenPositions.testCollection.collection.id;
      when((storageServiceSpy as any)._fenPositions).thenReturn([
        ...testData.collectionsWithFenPositions.testCollection.fenPositions,
        ...testData.collectionsWithFenPositions.errorsCollection.fenPositions
      ]);

      const fenPositions = storageService.getFenPositionsByCollection(collectionId);
      expect(fenPositions).toEqual(testData.collectionsWithFenPositions.testCollection.fenPositions);
    });
  });

  describe('get _fenPositions()', () => {
    it('should return the fen positions from storage when in storage', () => {
      const FenPositionSpy = spy(FenPosition);

      when((storageServiceSpy as any)._get(anyString())).thenReturn(
        testData.fenPositionsJsonArray
      );
      const fenPositions = (storageService as any)._fenPositions;
      expect(fenPositions).toBeDefined();
      expect(fenPositions.length).toEqual(3);
      verify(FenPositionSpy.createFromJson(anything())).thrice();
      verify((storageServiceSpy as any)._get(StorageKey.FenPositions)).once();
    });

    it('should return an empty array when nothing in storage', () => {
      when((storageServiceSpy as any)._get(anyString())).thenReturn(undefined);
      expect((storageService as any)._fenPositions).toEqual([]);
      verify((storageServiceSpy as any)._get(StorageKey.FenPositions)).once();
    });
  });

  describe('setFenPositions(value: FenPosition[])', () => {
    it('should store the given values', () => {
      const fenPositions = testData.fenPositions;
      storageService.setFenPositions(fenPositions);

      verify(
        (storageServiceSpy as any)._set(StorageKey.FenPositions, fenPositions)
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
