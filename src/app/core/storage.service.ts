import { Injectable } from '@angular/core';
import { IconSet } from 'src/models/icon-set.model';

export enum StorageKey {
  PrefIconSet = 'pref_icon_set'
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  /**
   * Return the stored icon set.
   * Return IconSet.Alpha when storage is empty.
   */
  public get iconSet(): IconSet {
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

  public setIconSet(value: IconSet) {
    this._set(StorageKey.PrefIconSet, value);
  }

  private _get(key: StorageKey): string {
    return localStorage.getItem(key);
  }

  private _set(key: StorageKey, value: any) {
    localStorage.setItem(key, value);
  }
}
