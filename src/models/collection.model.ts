import * as uuid from 'uuid/v4';
export class Collection {

  readonly id: string = uuid();
  name: string;
}
