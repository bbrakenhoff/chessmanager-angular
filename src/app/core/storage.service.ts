import { Injectable } from '@angular/core';
import { Collection } from 'src/models/collection.model';
import { IconSet } from 'src/models/icon-set.model';
import { FenDiagram } from 'src/models/fen-diagram.model';

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

  getCollections(): Collection[] {
    const json: any[] = this._getItem(StorageKey.Collections);

    if (json) {
      return json.map(item => Collection.createFromJson(item));
    }

    return [];
  }

  getCollectionById(collectionId: string): Collection {
    return this.getCollections().find(
      collection => collection.id === collectionId
    );
  }

  saveCollection(collection: Collection) {
    if (collection) {
      const collections = this.getCollections();
      let index = collections
        .map((item: Collection) => item.id)
        .indexOf(collection.id);

      const isNewCollection = index === -1;
      if (isNewCollection) {
        index = collections.length;
      }

      collections.splice(index, isNewCollection ? 0 : 1, collection);
      localStorage.setItem(StorageKey.Collections, JSON.stringify(collections));
    }
  }

  deleteCollection(collectionId: string) {
    const collections = this.getCollections().filter(
      (item: Collection) => item.id !== collectionId
    );

    this._setItem(StorageKey.Collections, collections);

    this._setItem(
      StorageKey.FenDiagrams,
      this._getFenDiagrams().filter(
        fenDiagram => fenDiagram.collectionId !== collectionId
      )
    );
  }

  getFenDiagramsByCollectionId(collectionId: string): FenDiagram[] {
    return this._getFenDiagrams().filter(
      fenDiagram => fenDiagram.collectionId === collectionId
    );
  }

  getFenDiagramById(fenDiagramId: string): FenDiagram {
    return this._getFenDiagrams().find(
      fenDiagram => fenDiagram.id == fenDiagramId
    );
  }

  saveFenDiagram(fenDiagram: FenDiagram) {
    if (fenDiagram) {
      const fenDiagrams = this._getFenDiagrams();
      let index = fenDiagrams
        .map((item: FenDiagram) => item.id)
        .indexOf(fenDiagram.id);

      const isNewFenDiagram = index === -1;
      if (isNewFenDiagram) {
        index = fenDiagrams.length;
      }

      fenDiagrams.splice(index, isNewFenDiagram ? 0 : 1, fenDiagram);
      this._setItem(StorageKey.FenDiagrams, fenDiagrams);
    }
  }

  deleteFenDiagram(fenDiagramId: string) {
    const fenDiagrams = this._getFenDiagrams().filter(
      fenDiagram => fenDiagram.id !== fenDiagramId
    );

    this._setItem(StorageKey.FenDiagrams, fenDiagrams);
  }

  getIconSet(): IconSet {
    const iconSet = this._getItem(StorageKey.PrefIconSet);

    return iconSet ? iconSet : IconSet.Alpha;
  }

  saveIconSet(iconSet: IconSet) {
    this._setItem(StorageKey.PrefIconSet, iconSet);
  }

  private _getFenDiagrams(): FenDiagram[] {
    const json: any[] = this._getItem(StorageKey.FenDiagrams);

    if (json) {
      return json.map(item => FenDiagram.createFromJson(item));
    }

    return [];
  }

  private _getItem(key: StorageKey) {
    const item = localStorage.getItem(key);

    if (item) {
      try {
        return JSON.parse(item);
      } catch (error) {
        return item;
      }
    }

    return undefined;
  }

  private _setItem(key: StorageKey, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
