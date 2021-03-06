import { Collection } from './collection.model';

describe('Collection', () => {

  describe('static create(name: string)', () => {
    it('should create a new collection', () => {
      const collection = Collection.create('Test');
      expect(collection).toBeDefined();
      expect(collection.id).toBeDefined();
      expect(collection.id).not.toEqual('');
      expect(collection.name).toEqual('Test');
    });
  });

  describe('static createFromJson(json: any)', () => {
    it('should create a collection from JSON', () => {
      const json = { _id: '0a8669a9-233f-4e6c-accc-5805b8ab0dd6', name: 'Test' };
      const collection = Collection.createFromJson(json);

      expect(collection).toBeDefined();
      expect(collection.id).toEqual(json._id);
      expect(collection.name).toEqual(json.name);
    });
  });
});
