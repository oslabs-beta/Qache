const Cache = require('../Qachengo/Qachengo');
const Node = require('../Qachengo/Node');

describe('Qachengo Tests', () => {
  describe('Node Tests', () => {
    let node;
    beforeEach(() => {
      node = new Node('testKey', { testData: 'testVal' });
    });
    it('should have properties: keyRef, value, prev, next, expires', () => {
      expect(node.keyRef).toBeDefined();
      expect(node.value).toBeDefined();
      expect(node.prev).toBeDefined();
      expect(node.next).toBeDefined();
      expect(node.expires).toBeDefined();
    });
  });

  describe('Cache Tests', () => {
    let cache = new Cache();
    let node;

    beforeEach(() => {
      cache = new Cache();
      const users = [
        {
          username: 'nader12334',
          firstName: 'nader',
          lastName: 'almogazy',
          age: 27,
        },
        {
          username: 'leocrossman',
          firstName: 'leo',
          lastName: 'crossman',
          age: 23,
        },
        {
          username: 'ep1815',
          firstName: 'evan',
          lastName: 'preedy',
          age: 23,
        },
        { username: 'stebed', firstName: 'steven', lastName: 'du', age: 26 },
      ];
      userNode = new Node('users', users);
    });

    it('should have properties: TTL, maxSize, content, size, head, tail', () => {
      expect(cache.TTL).toBeDefined();
      expect(cache.maxSize).toBeDefined();
      expect(cache.content).toBeDefined();
      expect(cache.size).toBeDefined();
      expect(cache.head).toBeDefined();
      expect(cache.tail).toBeDefined();
    });

    xit('should store data in the content property as an instance of Node', () => {
      const node = new Node();
      expect(cache.content['asdf']).toBeInstanceOf(Node);
    });
    describe(`Get Data`, () => {
      let getCache;
      beforeEach(() => {
        getCache = new Cache();
        const users = [
          {
            username: 'nader12334',
            firstName: 'nader',
            lastName: 'almogazy',
            age: 27,
          },
          {
            username: 'leocrossman',
            firstName: 'leo',
            lastName: 'crossman',
            age: 23,
          },
          {
            username: 'ep1815',
            firstName: 'evan',
            lastName: 'preedy',
            age: 23,
          },
          { username: 'stebed', firstName: 'steven', lastName: 'du', age: 26 },
        ];
        userNode = new Node('users', users);
      });
      describe('get()', () => {
        it(`should be a method on the 'Cache' class`, () => {
          expect(getCache.get).toBeDefined();
          expect(typeof getCache.get).toBe('function');
        });

        xit(`take in a cache key and return the data found inside that key's/Node's value property`, () => {
          // need to test for `set` logic before this...
          // expect();
        });
      });
    });
  });
});
