import { Injectable } from '@angular/core';
import { IconSet } from 'src/models/icon-set.model';
import {
  defaultCollections,
  TestData
} from '../util/default-collections-generator';
import { Collection } from 'src/models/collection.model';

export enum StorageKey {
  PrefIconSet = 'pref_icon_set',
  Collections = 'collections',
  FenPositions = 'fen_positions'
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  public get collections() {
    const json: any[] = this._get(StorageKey.Collections);

    if (json) {
      console.log(`Bijoya: storage.service -> json`, json);
      return json.map((collection: any) =>
        Collection.createFromJson(collection)
      );
    }

    return [];
  }

  /**
   * Return the stored icon set.
   * Return IconSet.Alpha when storage is empty.
   */
  get iconSet(): IconSet {
    const value = this._get(StorageKey.PrefIconSet);

    switch (value) {
      case IconSet.Leipzig:
        return IconSet.Leipzig;
      case IconSet.Maya:
        return IconSet.Maya;
      default:
        return IconSet.Alpha;
    }
  }

  setIconSet(value: IconSet) {
    this._set(StorageKey.PrefIconSet, value);
  }

  private _get(key: StorageKey): any {
    const value = localStorage.getItem(key);

    try {
      const parsed = JSON.parse(value);
      console.log(`Bijoya: storage.service -> _get parsed`, parsed);
      return parsed;
    } catch (error) {
      console.log(`Bijoya: storage.service -> _get not parsed`, value);
      return value;
    }
  }

  private _set(key: StorageKey, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  createTestData() {
    this._set(
      StorageKey.Collections,
      defaultCollections.map((testData: TestData) => testData.collection)
    );

    const fenPositions = [];
    for (const testData of defaultCollections) {
      fenPositions.push(...testData.fenPositions);
    }

    this._set(StorageKey.FenPositions, fenPositions);
  }
}
