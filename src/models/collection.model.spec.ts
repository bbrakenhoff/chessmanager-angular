import { Collection } from './collection.model';

describe('Collection', () => {

  let collection: Collection;

  beforeEach(() => {
    collection = new Collection();
  });

  describe('constructor()', () => {

    it('should create an empty collection', () => {
      expect(collection).toBeDefined();
      expect(collection.id).toBeDefined();
    });
  });
});