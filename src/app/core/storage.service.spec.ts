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

describe('StorageService', () => {
  const testData = {
    storageStringValue: 'Storage key value',
    storageJsonValue: '[{"pizza": "calzone"}]',
    collectionsJsonArray: [
      {
        _id: '733386ca-21ee-46f2-a3cd-8e8cb323570f',
        name: 'Test collection'
      },
      {
        _id: 'b880b03b-fd9a-44dd-b03f-c66eb53bfb06',
        name: 'Problems'
      },
      {
        _id: '4ff1dd7b-127a-4544-82de-a36f1fd0e7cd',
        name: 'Errors'
      }
    ],
    get collections() {
      return this.collectionsJsonArray.map((json: any) =>
        Collection.createFromJson(json)
      );
    },
    fenPositionsJsonArray: [
      {
        collectionId: '10c98c7a-647f-4780-80f6-cc06d2fe3816',
        description: 'Starting position',
        _error: null,
        _id: '00b9ef28-8879-4869-bb20-333e48fdd236',
        _notation: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
      },
      {
        collectionId: '10c98c7a-647f-4780-80f6-cc06d2fe3816',
        description: 'Empty board',
        _error: null,
        _id: '3e20c455-c740-4abf-b2d3-0836da6c2c53',
        _notation: '8/8/8/8/8/8/8/8'
      },
      {
        collectionId: '10c98c7a-647f-4780-80f6-cc06d2fe3816',
        description: 'Eight queens solution',
        _error: null,
        _id: '669123fc-15b8-4706-9791-84205e2f5d46',
        _notation: 'Q7/6Q1/4Q3/7Q/1Q6/3Q4/5Q2/2Q5'
      }
    ],
    get fenPositions() {
      return this.fenPositionsJsonArray.map((json: any) =>
        FenPosition.createFromJson(json)
      );
    }
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

  describe('get fenPositions()', () => {
    it('should return the fen positions from storage when in storage', () => {
      const FenPositionSpy = spy(FenPosition);

      when((storageServiceSpy as any)._get(anyString())).thenReturn(
        testData.fenPositionsJsonArray
      );
      const fenPositions = storageService.fenPositions;
      expect(fenPositions).toBeDefined();
      expect(fenPositions.length).toEqual(3);
      verify(FenPositionSpy.createFromJson(anything())).thrice();
      verify((storageServiceSpy as any)._get(StorageKey.FenPositions)).once();
    });

    it('should return an empty array when nothing in storage', () => {
      when((storageServiceSpy as any)._get(anyString())).thenReturn(undefined);
      expect(storageService.collections).toEqual([]);
      verify((storageServiceSpy as any)._get(StorageKey.Collections)).once();
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
