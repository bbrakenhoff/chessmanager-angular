import { Collection } from './collection.model';

describe('Collection', () => {

  describe('create()', () => {
    it('should create a new collection', () => {
      const collection = Collection.create();
      expect(collection).toBeDefined();
      expect(collection.id).toBeDefined();
    });
  });

  describe('createFromJson(json: any)', () => {
    it('should create a collection from JSON', () => {
      const json = { id: '0a8669a9-233f-4e6c-accc-5805b8ab0dd6', name: 'Test' };
      const collection = Collection.createFromJson(json);

      expect(collection).toBeDefined();
      expect(collection.id).toEqual('0a8669a9-233f-4e6c-accc-5805b8ab0dd6');
      expect(collection.name).toEqual('Test');
    });
  });
});
