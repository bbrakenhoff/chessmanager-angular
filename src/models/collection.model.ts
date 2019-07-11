import * as uuid from 'uuid/v4';
export class Collection {
  private _id: string = uuid();
  get id() {
    return this._id;
  }

  name = '';

  private constructor() {}

  static create(name: string) {
    const collection = new Collection();
    collection.name = name;
    return collection;
  }

  static createFromJson(json: any) {
    const collection = Collection.create(json.name);
    collection._id = json._id;

    return collection;
  }
}
