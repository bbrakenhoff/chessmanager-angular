import * as uuid from 'uuid/v4';
export class Collection {
  private _id: string = uuid();
  get id() {
    return this._id;
  }

  name = '';

  private constructor() {}

  static create() {
    return new Collection();
  }

  static createFromJson(json: any) {
    const collection = Collection.create();
    collection._id = json._id;
    collection.name = json.name;

    return collection;
  }
}
