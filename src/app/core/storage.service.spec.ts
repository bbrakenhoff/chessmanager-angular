import { TestBed } from '@angular/core/testing';
import * as TypeMoq from 'typemoq';

import { StorageService, StorageKey } from './storage.service';
import { IconSet } from 'src/models/icon-set.model';

describe('StorageService', () => {
  const valueMock = 'Storage key value';

  const localStorageMock: TypeMoq.IGlobalMock<Storage> = TypeMoq.GlobalMock.ofInstance(localStorage, 'localStorage');
  let storageService: StorageService;

  beforeEach(() => {
    localStorageMock.reset();
    TypeMoq.GlobalScope.using(localStorageMock);

    TestBed.configureTestingModule({});
    storageService = TestBed.get(StorageService);
  });

  describe('get iconSet', () => {

    it('should return the stored icon set when in storage', () => {
      localStorageMock.setup(instance => instance.getItem(TypeMoq.It.isAnyString()))
        .returns(() => IconSet.Maya);

      TypeMoq.GlobalScope.using(localStorageMock).with(() => {
        expect(storageService.iconSet).toEqual(IconSet.Maya);
        localStorageMock.verify(instance => instance.getItem(StorageKey.PrefIconSet), TypeMoq.Times.once());
      });
    });

    it('should return the default icon set IconSet.Alpha when nothing in storage', () => {
      localStorageMock.setup(instance => instance.getItem(TypeMoq.It.isAnyString()))
        .returns(() => null);

      TypeMoq.GlobalScope.using(localStorageMock).with(() => {
        localStorageMock.verify(instance => instance.getItem(StorageKey.PrefIconSet), TypeMoq.Times.once());
        expect(storageService.iconSet).toEqual(IconSet.Alpha);
      });
    });
  });

  describe('setIconSet(value: IconSet)', () => {

    it('should store the given value', () => {
      TypeMoq.GlobalScope.using(localStorageMock).with(() => {
        storageService.setIconSet(IconSet.Maya);
        localStorageMock.verify(instance => instance.setItem(StorageKey.PrefIconSet, TypeMoq.It.isAny()), TypeMoq.Times.once());
      });
    });
  });

  describe('_get(key: StorageKey): any', () => {

    it('should retrieve the value matching with the given key', () => {
      localStorageMock.setup(instance => instance.getItem(TypeMoq.It.isAnyString()))
        .returns(() => valueMock);

      TypeMoq.GlobalScope.using(localStorageMock).with(() => {
        const value = (storageService as any)._get(StorageKey.PrefIconSet);
        localStorageMock.verify(instance => instance.getItem(TypeMoq.It.isAnyString()), TypeMoq.Times.once());
        expect(value).toEqual(valueMock);
      });
    });
  });

  describe('_set(key: StorageKey, value: any)', () => {

    it('should save the new value under the given key', () => {
      TypeMoq.GlobalScope.using(localStorageMock).with(() => {
        (storageService as any)._set(StorageKey.PrefIconSet, valueMock);
        localStorageMock.verify(instance => instance.setItem(StorageKey.PrefIconSet, valueMock), TypeMoq.Times.once());
      });
    });
  });
});
