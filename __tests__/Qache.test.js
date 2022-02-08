const Cache = require('../Qache/Qache');
const Node = require('../Qache/Node');

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
  {
    username: 'stebed',
    firstName: 'steven',
    lastName: 'du',
    age: Number.MAX_VALUE,
  },
];

describe('Qache Tests', () => {
  describe('Node', () => {
    let node;
    beforeEach(() => {
      node = new Node('testKey', { testData: 'testVal' });
    });
    it('should have properties: keyRef, value, prev, next, expires, accessCount', () => {
      expect(node.keyRef).toBeDefined();
      expect(node.value).toBeDefined();
      expect(node.prev).toBeDefined();
      expect(node.next).toBeDefined();
      expect(node.expires).toBeDefined();
      expect(node.accessCount).toBeDefined();
    });
  });

  describe('Cache', () => {
    let cache, users, userNode;
    // this beforeEach will change soonish... will be replaced with whatever's relevant or just removed.
    beforeEach(() => {
      users = [...testUsers];
      users2 = [...testUsers].map((user) => user.username + 2);
      users3 = [...testUsers].map((user) => user.username + 3);
      users4 = [...testUsers].map((user) => user.username + 4);
      userNode = new Node('users', users);
      userNode2 = new Node('users2', users2);
      userNode3 = new Node('users3', users3);
      userNode4 = new Node('users4', users4);
      cache = new Cache();
    });

    it('should have properties: TTL, maxSize, content, size, policyType, head, tail', () => {
      expect(cache.TTL).toBeDefined();
      expect(cache.maxSize).toBeDefined();
      expect(cache.content).toBeDefined();
      expect(cache.size).toBeDefined();
      expect(cache.policyType).toBeDefined();
      expect(cache.head).toBeDefined();
      expect(cache.tail).toBeDefined();
    });

    it('should have initial property values: head = tail = null, size = 0, content = {}, maxSize = options.maxSize, policyType = options.evictionPolicy', () => {
      expect(cache.head).toBe(null);
      expect(cache.tail).toBe(null);
      expect(cache.size).toBe(0);
      expect(cache.content).toEqual({});
      expect(cache.policyType).toEqual('LRU');
    });

    describe('set()', () => {
      it(`should be a method on the 'Cache' class`, () => {
        expect(cache.set).toBeDefined();
        expect(typeof cache.set).toBe('function');
      });

      it('should take in any data type and store it in the cache as a node with the value of what was passed into set', () => {
        const testKeys = [
          'string',
          'number',
          'boolean',
          'array',
          'object',
          'undefined',
          'null',
          'NaN',
        ].map((type) => type + 'Key');
        const testTypes = [
          'testString',
          7,
          true,
          [1, 2, 3],
          { a: 'asdf' },
          undefined,
          null,
          NaN,
        ];
        for (let i = 0; i < testTypes.length; i++) {
          const key = testKeys[i];
          const typeVal = testTypes[i];
          cache.set(key, typeVal);
          expect(cache.content[key]).toBeInstanceOf(Node);
          expect(cache.content[key].value).toBe(typeVal);
          cache = new Cache();
        }
      });

      it('should take in a cache key/value, add the node to the queue, and add the node to the cache at the key when cache is empty', () => {
        expect(cache.head).toBe(null);
        expect(cache.tail).toBe(null);
        const key = 'users';
        cache.set(key, users);
        let node = cache.content[key];
        expect(node).toBeInstanceOf(Node);
        expect(node).toEqual(userNode);
        expect(node.keyRef).toBe(key);
        expect(node.value).toBe(users);
        expect(node.prev).toBe(null);
        expect(node.next).toBe(null);
        expect(node.accessCount).toBe(1);
        expect(cache.head).toBe(node);
        expect(cache.tail).toBe(node);
      });

      it('should increment cache size when size < maxSize', () => {
        expect(cache.size).toBe(0);
        cache.set('users', users);
        expect(cache.size).toBe(1);
        cache.set('users2', users2);
        expect(cache.size).toBe(2);
      });

      it('should not alter cache size when size equals maxSize', () => {
        cache.maxSize = 0;
        cache.set('users', users);
        expect(cache.size).toBe(0);
        cache = new Cache();
        cache.maxSize = 3;
        cache.set('users', users);
        expect(cache.size).toBe(1);
        cache.set('users2', users2);
        expect(cache.size).toBe(2);
        cache.set('users3', users3);
        expect(cache.size).toBe(3);
        cache.set('users4', users4);
        expect(cache.size).toBe(3);
        userNode2.prev = null;
        userNode2.next = userNode3;
        userNode3.prev = userNode2;
        userNode3.next = userNode4;
        userNode4.prev = userNode3;
      });
    });

    describe('get()', () => {
      it(`should be a method on the 'Cache' class`, () => {
        expect(cache.get).toBeDefined();
        expect(typeof cache.get).toBe('function');
      });

      it(`should take in a cache key and return the data found inside that key's/Node's 'value' property`, () => {
        cache.content['users'] = userNode;
        expect(cache.get('users')).toBe(users);
      });

      it('should increment accessCount', () => {
        userNode.accessCount = 0;
        cache.content['users'] = userNode;
        expect(cache.get('users')).toBe(users);
        expect(userNode.accessCount).toBe(1);
        expect(cache.get('users')).toBe(users);
        expect(userNode.accessCount).toBe(2);
      });
    });

    describe('LRU Eviction Policy Tests:', () => {
      describe('set()', () => {
        it('should add a node to the queue and cache when there is one element in the cache and update the cache tail to point to the added node', () => {
          cache.set('users', users);
          cache.set('users2', users2);
          userNode.next = userNode2;
          userNode2.prev = userNode;
          expect(cache.head).toEqual(userNode);
          expect(cache.tail).toEqual(userNode2);
          expect(cache.tail).toBeInstanceOf(Node);
        });
        it('should add a node to the queue and cache when there are two elements in the cache', () => {
          cache.set('users', users);
          cache.set('users2', users2);
          cache.set('users3', users3);
          userNode.next = userNode2;
          userNode2.prev = userNode;
          userNode2.next = userNode3;
          userNode3.prev = userNode2;
          expect(cache.head).toEqual(userNode);
          expect(cache.tail).toEqual(userNode3);
          expect(cache.head.next).toEqual(userNode2);
          expect(cache.tail.prev).toEqual(userNode2);
          expect(cache.head.next.next).toBe(cache.tail);
          expect(cache.tail.prev.prev).toBe(cache.head);
          expect(cache.content['users2']).toEqual(userNode2);
        });
        it('should add a node to the queue and cache when there are 3+ elements in the cache', () => {
          cache.set('users', users);
          cache.set('users2', users2);
          cache.set('users3', users3);
          cache.set('users4', users4);
          userNode.next = userNode2;
          userNode2.prev = userNode;
          userNode2.next = userNode3;
          userNode3.prev = userNode2;
          userNode3.next = userNode4;
          userNode4.prev = userNode3;
          expect(cache.head).toEqual(userNode);
          expect(cache.head.next).toEqual(userNode2);
          expect(cache.head.next.next).toEqual(userNode3);
          expect(cache.head.next.next.next).toEqual(cache.tail);
          expect(cache.tail).toEqual(userNode4);
          expect(cache.tail.prev).toEqual(userNode3);
          expect(cache.tail.prev.prev).toEqual(userNode2);
          expect(cache.tail.prev.prev.prev).toEqual(userNode);
          expect(cache.content['users']).toEqual(userNode);
          expect(cache.content['users2']).toEqual(userNode2);
          expect(cache.content['users3']).toEqual(userNode3);
          expect(cache.content['users4']).toEqual(userNode4);
        });

        it('should add a node to the tail and remove + reassign the head when cache size equals maxSize', () => {
          cache.maxSize = 3;
          cache.set('users', users);
          cache.set('users2', users2);
          cache.set('users3', users3);
          cache.set('users4', users4);
          userNode2.prev = null;
          userNode2.next = userNode3;
          userNode3.prev = userNode2;
          userNode3.next = userNode4;
          userNode4.prev = userNode3;
          expect(cache.head).toEqual(userNode2);
          expect(cache.head.next).toEqual(userNode3);
          expect(cache.head.next.next).toBe(cache.tail);
          expect(cache.tail).toEqual(userNode4);
          expect(cache.tail.prev).toEqual(userNode3);
          expect(cache.tail.prev.prev).toBe(cache.head);
        });
      });
      xdescribe('get()', () => {
        xit('should add a node to the queue and cache when there is one element in the cache', () => {});
        xit('should add a node to the queue and cache when there are two elements in the cache', () => {});
        xit('should add a node to the queue and cache when there are more than two elements in the cache', () => {});
      });
    });
    describe('LFU Eviction Policy Tests:', () => {
      it('should ', () => {});
    });
  });
});
