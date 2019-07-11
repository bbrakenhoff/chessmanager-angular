import { TestBed } from '@angular/core/testing';

import { StorageService, StorageKey } from './storage.service';
import { spy, anyString, when, verify, resetCalls, reset } from 'ts-mockito';
import { IconSet } from 'src/models/icon-set.model';
import { Collection } from 'src/models/collection.model';

describe('StorageService', () => {
  const storageStringValue = 'Storage key value';
  const storageJSONValue = '[{"pizza": "calzone"}]';

  const localStorageSpy: Storage = spy(localStorage);
  let storageService: StorageService;
  let storageServiceSpy: StorageService;

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
      when((storageServiceSpy as any)._get(anyString())).thenReturn([
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
      ]);
      const collections = storageService.collections;
      expect(collections).toBeDefined();
      expect(collections.length).toEqual(3);
      verify((storageServiceSpy as any)._get(StorageKey.Collections)).once();
    });

    it('should return an empty array when nothing in storage', () => {
      when((storageServiceSpy as any)._get(anyString())).thenReturn(undefined);
      expect(storageService.collections).toEqual([]);
      verify((storageServiceSpy as any)._get(StorageKey.Collections)).once();
    });
  });

  describe('setCollections(values: Collection[])', () => {
    it('should store the given values', () => {
      const collections = [
        Collection.create('Test collection'),
        Collection.create('Problems'),
        Collection.create('Errors')
      ];
      storageService.setCollections(collections);

      verify(
        (storageServiceSpy as any)._set(StorageKey.Collections, collections)
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
      when(localStorageSpy.getItem(anyString())).thenReturn(storageJSONValue);

      const value = (storageService as any)._get(StorageKey.PrefIconSet);
      verify(localStorageSpy.getItem(StorageKey.PrefIconSet)).once();
      expect(value).toEqual(JSON.parse(storageJSONValue));
    });

    it('should return a string when the value being returned cannot be parsed to JSON', () => {
      when(localStorageSpy.getItem(anyString())).thenReturn(storageStringValue);

      const value = (storageService as any)._get(StorageKey.PrefIconSet);
      verify(localStorageSpy.getItem(StorageKey.PrefIconSet)).once();
      expect(value).toEqual(storageStringValue);
    });
  });

  describe('_set(key: StorageKey, value: any)', () => {
    it('should save the new value under the given key', () => {
      (storageService as any)._set(StorageKey.PrefIconSet, storageStringValue);
      verify(
        localStorageSpy.setItem(
          StorageKey.PrefIconSet,
          JSON.stringify(storageStringValue)
        )
      ).once();
    });
  });
});
