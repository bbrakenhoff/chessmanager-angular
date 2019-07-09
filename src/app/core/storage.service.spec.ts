import { TestBed } from '@angular/core/testing';

import { StorageService, StorageKey } from './storage.service';
import { spy, anyString, when, verify, resetCalls, reset } from 'ts-mockito';
import { IconSet } from 'src/models/icon-set.model';

describe('StorageService', () => {
  const valueMock = 'Storage key value';

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
      when(localStorageSpy.getItem(anyString())).thenReturn(valueMock);

      const value = (storageService as any)._get(StorageKey.PrefIconSet);
      verify(localStorageSpy.getItem(StorageKey.PrefIconSet)).once();
      expect(value).toEqual(valueMock);
    });
  });

  describe('_set(key: StorageKey, value: any)', () => {
    it('should save the new value under the given key', () => {
      (storageService as any)._set(StorageKey.PrefIconSet, valueMock);
      verify(
        localStorageSpy.setItem(
          StorageKey.PrefIconSet,
          JSON.stringify(valueMock)
        )
      ).once();
    });
  });
});
