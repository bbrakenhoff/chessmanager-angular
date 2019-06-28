import { Injectable } from '@angular/core';
import { IconSet } from 'src/models/icon-set.model';

export enum StorageKey {
  PrefIconSet = 'pref_icon_set'
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public get iconSet() {
    const value = this._get(StorageKey.PrefIconSet);
    return value ? value : IconSet.Alpha;
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
