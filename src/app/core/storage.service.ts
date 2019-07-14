import { Injectable } from '@angular/core';
import { IconSet } from 'src/models/icon-set.model';
import { Collection } from 'src/models/collection.model';
import { FenDiagram } from '../../models/fen-diagram.model';
import { TestDataFactory, TestCollection } from '../util/test-data-factory';

export enum StorageKey {
  PrefIconSet = 'pref_icon_set',
  Collections = 'collections',
  FenDiagrams = 'fen_diagrams'
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

  public getFenDiagramsByCollection(collectionId: string) {
    return this._fenDiagrams.filter(
      fenDiagram => fenDiagram.collectionId === collectionId
    );
  }

  public getFenDiagramById(fenDiagramId: string) {
    const fenDiagramWithId = this._fenDiagrams.find(
      fenDiagram => fenDiagram.id === fenDiagramId
    );

    return fenDiagramWithId ? fenDiagramWithId : null;
  }

  private get _fenDiagrams() {
    const json: any[] = this._get(StorageKey.FenDiagrams);

    if (json) {
      return json.map((fenDiagram: any) =>
        FenDiagram.createFromJson(fenDiagram)
      );
    }

    return [];
  }

  public setFenDiagrams(value: FenDiagram[]) {
    this._set(StorageKey.FenDiagrams, value);
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
    const fenDiagrams = [];

    for (const testCollectionName of Object.keys(testCollections)) {
      collections.push(testCollections[testCollectionName].collection);
      fenDiagrams.push(...testCollections[testCollectionName].fenDiagrams);
    }
    this.setCollections(collections);
    this.setFenDiagrams(fenDiagrams);
  }
}
