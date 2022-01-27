const Cache = require('../Qachengo/Qachengo');
const Node = require('../Qachengo/Node');

const testUsers = [
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

describe('Qachengo Tests', () => {
  describe('Node', () => {
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

  describe('Cache', () => {
    // this beforeEach will change soonish... will be replaced with whatever's relevant or just removed.
    beforeEach(() => {
      const users = [...testUsers];
      let userNode = new Node('users', users);
    });

    it('should have properties: TTL, maxSize, content, size, head, tail', () => {
      let cache = new Cache();
      expect(cache.TTL).toBeDefined();
      expect(cache.maxSize).toBeDefined();
      expect(cache.content).toBeDefined();
      expect(cache.size).toBeDefined();
      expect(cache.head).toBeDefined();
      expect(cache.tail).toBeDefined();
    });

    it('should have initial property values: head = tail = null, size = 0, content = {}, maxSize = options.maxSize', () => {
      let cache = new Cache();
      expect(cache.head).toBe(null);
      expect(cache.tail).toBe(null);
      expect(cache.size).toBe(0);
      expect(cache.content).toEqual({});
    });

    describe(`Get Data`, () => {
      let cache;
      beforeEach(() => {
        cache = new Cache();
        users = [...testUsers];
        userNode = new Node('users', users);
      });

      describe('set()', () => {
        it(`should be a method on the 'Cache' class`, () => {
          expect(cache.set).toBeDefined();
          expect(typeof cache.set).toBe('function');
        });
        it('should take in a cache key/value, add the node to the queue, and add the node to the cache at the key when cache is empty', () => {
          expect(cache.head).toBe(null);
          expect(cache.tail).toBe(null);
          const key = 'users';
          cache.set(key, users);
          let node = cache.content[key];
          expect(node).toBeInstanceOf(Node);
          expect(node.keyRef).toBe('users');
          expect(node.value).toBe(users);
          expect(node.prev).toBe(null);
          expect(node.next).toBe(null);
          expect(cache.head).toBe(node);
          expect(cache.tail).toBe(node);
        });
      });

      describe('get()', () => {
        it(`should be a method on the 'Cache' class`, () => {
          expect(cache.get).toBeDefined();
          expect(typeof cache.get).toBe('function');
        });

        xit(`take in a cache key and return the data found inside that key's/Node's value property`, () => {
          // need to test for `set` logic before this...
          // expect();
        });
      });
    });
  });
});
