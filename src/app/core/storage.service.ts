import { Injectable } from '@angular/core';
import { IconSet } from 'src/models/icon-set.model';
import { Collection } from 'src/models/collection.model';
import { FenPosition } from 'src/models/fen-position.model';
import { TestDataFactory, TestCollection } from '../util/test-data-factory';

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
      return json.map((collection: any) =>
        Collection.createFromJson(collection)
      );
    }

    return [];
  }

  public setCollections(value: Collection[]) {
    this._set(StorageKey.Collections, value);
  }

  public getFenPositionsByCollection(collectionId: string) {
    return this._fenPositions.filter(
      fenPosition => fenPosition.collectionId === collectionId
    );
  }

  private get _fenPositions() {
    const json: any[] = this._get(StorageKey.FenPositions);

    if (json) {
      return json.map((fenPosition: any) =>
        FenPosition.createFromJson(fenPosition)
      );
    }

    return [];
  }

  public setFenPositions(value: FenPosition[]) {
    this._set(StorageKey.FenPositions, value);
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
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }

  private _set(key: StorageKey, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  createTestData() {
    const testCollections = TestDataFactory.createAllTestCollections();
    const collections = [];
    const fenPositions = [];

    for (const testCollectionName of Object.keys(testCollections)) {
      collections.push(testCollections[testCollectionName].collection);
      fenPositions.push(...testCollections[testCollectionName].fenPositions);
    }
    this.setCollections(collections);
    this.setFenPositions(fenPositions);
  }
}
