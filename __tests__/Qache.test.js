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

  describe('Qache', () => {
    let cache, users, userNode;
    // this beforeEach will change soonish... will be replaced with whatever's relevant or just removed.
    beforeEach(() => {
      users = [...testUsers];
      users2 = testUsers.map((user) => user.username + 2);
      users3 = testUsers.map((user) => user.username + 3);
      users4 = testUsers.map((user) => user.username + 4);
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
      it(`should be a method on the 'Qache' class`, () => {
        expect(cache.set).toBeDefined();
        expect(typeof cache.set).toBe('function');
      });

      it('should take in a data type and store a refrence to the value in the cache as a node', () => {
        const testKeys = [
          'string',
          'number',
          'boolean',
          'array',
          'object',
          'null',
          'NaN',
        ].map((type) => type + 'Key');
        const testTypes = [
          'testString',
          7,
          true,
          [1, 2, 3],
          { a: 'asdf' },
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
        expect(cache.size).toEqual(Object.keys(cache.content).length);
      });
    });

    describe('get()', () => {
      it(`should be a method on the 'Qache' class`, () => {
        expect(cache.get).toBeDefined();
        expect(typeof cache.get).toBe('function');
      });

      it('should get a value from a key in the cache when there is one element in the cache', () => {
        cache.set('users', users);
        expect(cache.get('users')).toEqual(userNode.value);
      });
      it('should get a value from a key in the cache when there are two elements in the cache', () => {
        cache.set('users', users);
        cache.set('users2', users2);
        expect(cache.get('users2')).toEqual(userNode2.value);
      });
      it('should get a value from a key in the cache when there are 3+  elements in the cache', () => {
        cache.set('users', users);
        cache.set('users2', users2);
        cache.set('users3', users3);
        expect(cache.get('users3')).toEqual(userNode3.value);
      });

      it('should get the reference to the value in the node and not a copy of the value', () => {
        cache.content['users'] = userNode;
        expect(cache.get('users')).toBe(userNode.value);
      });

      it('should increment accessCount on the cache node', () => {
        userNode.accessCount = 0;
        cache.content['users'] = userNode;
        expect(cache.get('users')).toBe(users);
        expect(userNode.accessCount).toBe(1);
        expect(cache.get('users')).toBe(users);
        expect(userNode.accessCount).toBe(2);
      });
    });

    describe('delete()', () => {
      beforeEach(() => {
        users = [...testUsers];
        users2 = testUsers.map((user) => user.username + 2);
        users3 = testUsers.map((user) => user.username + 3);
        users4 = testUsers.map((user) => user.username + 4);
        userNode = new Node('users', users);
        userNode2 = new Node('users2', users2);
        userNode3 = new Node('users3', users3);
        userNode4 = new Node('users4', users4);
        cache = new Cache();
      });

      it(`should be a method on the 'Qache' class`, () => {
        expect(cache.delete).toBeDefined();
        expect(typeof cache.delete).toBe('function');
      });

      it('should take in a cache key and remove the corresponding node from the cache', () => {
        cache.set('users', users);
        cache.delete('users');
        expect(cache.get('users')).toBe(null);
        expect(cache.content['users']).toBe(undefined);
      });

      it('should take in a cache key and remove the corresponding node from the queue', () => {
        cache.set('users', users);
        cache.set('users2', users2);
        cache.set('users3', users3);
        cache.set('users4', users4);
        cache.delete('users2');
        let curr = cache.head;
        while (curr) {
          expect(curr).not.toEqual(userNode2);
          curr = curr.next;
        }
      });

      it('should remove a node from the cache and set head/tail to null when the node was the only one in cache before deletion', () => {
        cache.set('users', users);
        cache.delete('users');
        expect(cache.head).toBe(null);
        expect(cache.tail).toBe(null);
      });

      it('should assign the next node to the head of the linked list when the node at the head is deleted', () => {
        cache.set('users', users);
        cache.set('users2', users2);
        cache.set('users3', users3);
        cache.set('users4', users4);
        cache.delete('users');
        userNode2.prev = null;
        userNode2.next = userNode3;
        userNode3.prev = userNode2;
        userNode3.next = userNode4;
        userNode4.prev = userNode3;
        expect(cache.head).toEqual(userNode2);
      });
      it('should assign the previous node to the tail of the linked list when the node at the tail is deleted', () => {
        cache.set('users', users);
        cache.set('users2', users2);
        cache.set('users3', users3);
        cache.set('users4', users4);
        cache.delete('users4');
        userNode.next = userNode2;
        userNode2.prev = userNode;
        userNode2.next = userNode3;
        userNode3.prev = userNode2;
        userNode3.next = null;
        expect(cache.tail).toEqual(userNode3);
      });
    });

    describe('invalidate()', () => {
      beforeEach(() => {
        users = [...testUsers];
        users2 = testUsers.map((user) => user.username + 2);
        users3 = testUsers.map((user) => user.username + 3);
        users4 = testUsers.map((user) => user.username + 4);
        userNode = new Node('users', users);
        userNode2 = new Node('users2', users2);
        userNode3 = new Node('users3', users3);
        userNode4 = new Node('users4', users4);
        cache = new Cache();
      });

      it(`should be a method on the 'Qache' class`, () => {
        expect(cache.invalidate).toBeDefined();
        expect(typeof cache.invalidate).toBe('function');
      });

      it('should clear the entire cache if no arguments are passed in', () => {
        cache.set('users', users);
        cache.set('users2', users2);
        cache.set('users3', users3);
        cache.set('users4', users4);
        cache.invalidate();
        expect(cache.size).toBe(0);
        expect(cache.head).toBe(null);
        expect(cache.tail).toBe(null);
        expect(Object.keys(cache.content).length).toBe(0);
      });

      it('should remove a single item from the cache when it is the only item in the cache', () => {
        cache.set('users', users);
        cache.invalidate('users');
        expect(cache.content['users']).toBe(undefined);
      });

      it('should remove a single item from the cache when there are two items in the cache and the item is at the head, as well as reassign the head node to the next node in the queue', () => {
        cache.set('users', users);
        cache.set('users2', users2);
        cache.invalidate('users');
        expect(cache.content['users']).toBe(undefined);
        expect(cache.head).toBe(cache.tail);
      });
      it('should remove a single item from the cache when there are two items in the cache and the item is at the tail, as well as reassign the tail node to the previous node in the queue', () => {
        cache.set('users', users);
        cache.set('users2', users2);
        cache.invalidate('users2');
        expect(cache.content['users2']).toBe(undefined);
        expect(cache.tail).toBe(cache.head);
      });
      it('should remove a single item from the cache when there are 3+ items in the cache', () => {
        cache.set('users', users);
        cache.set('users2', users2);
        cache.set('users3', users3);
        cache.invalidate('users2');
        expect(cache.content['users2']).toBe(undefined);
      });
      it('should remove all keys passed in from the cache', () => {
        const userArr = ['users2', 'users3', 'users'];
        cache.set('users', users);
        cache.set('users2', users2);
        cache.set('users3', users3);
        cache.invalidate(...userArr);
        for (const user of userArr) {
          expect(cache.content[user]).toBe(undefined);
        }
      });
    });

    describe('cleanUp()', () => {
      beforeEach(() => {
        users = [...testUsers];
        users2 = testUsers.map((user) => user.username + 2);
        users3 = testUsers.map((user) => user.username + 3);
        users4 = testUsers.map((user) => user.username + 4);
        userNode = new Node('users', users);
        userNode2 = new Node('users2', users2);
        userNode3 = new Node('users3', users3);
        userNode4 = new Node('users4', users4);
        cache = new Cache();
      });

      it(`should be a method on the 'Qache' class`, () => {
        expect(cache.invalidate).toBeDefined();
        expect(typeof cache.invalidate).toBe('function');
      });

      it('should evict a provided key if the key exceeds its TTL', () => {
        cache.set('users', users);
        cache.set('users2', users2);
        cache.set('users3', users3);
        cache.set('users4', users4);
        cache.content['users'].expires = Date.now() - 100;
        cache.cleanUp('users');
        expect(cache.content['users']).toBe(undefined);
      });

      it('should not evict a provided key if the key does not exceed its TTL', () => {
        cache.set('users', users);
        cache.set('users2', users2);
        cache.set('users3', users3);
        cache.set('users4', users4);
        cache.content['users'].expires = Date.now() + 100;
        cache.cleanUp('users');
        expect(cache.content['users']).not.toBe(undefined);
      });

      it('should evict all provided keys when all the keys exceed their respective TTL', () => {
        cache.set('users', users);
        cache.set('users2', users2);
        cache.set('users3', users3);
        cache.set('users4', users4);
        for (const user of ['users', 'users2', 'users3', 'users4']) {
          cache.content[user].expires = Date.now() - 100;
          cache.cleanUp(user);
          expect(cache.content[user]).toBe(undefined);
        }
      });

      it('should evict some provided keys on successive calls when some of the keys exceed their respective TTL', () => {
        const users = ['users', 'users2', 'users3', 'users4'];
        cache.set('users', users);
        cache.set('users2', users2);
        cache.set('users3', users3);
        cache.set('users4', users4);
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          cache.content[user].expires =
            i % 2 === 0 ? Date.now() - 100 : Date.now() + 100;
          cache.cleanUp(user);
          i % 2 === 0
            ? expect(cache.content[user]).toBe(undefined)
            : expect(cache.content[user]).not.toBe(undefined);
        }
      });

      it('should evict all keys in the cache whose expiration time has passed and no key is passed in', () => {
        const users = ['users', 'users2', 'users3', 'users4'];
        cache.set('users', users);
        cache.set('users2', users2);
        cache.set('users3', users3);
        cache.set('users4', users4);
        console.log(cache.content);
        users.forEach((user) => {
          cache.content[user].expires = Date.now() - 100;
        });
        cache.cleanUp();
        for (const user of users) {
          expect(cache.content[user]).toBe(undefined);
        }
      });
    });

    describe('LRU Eviction Policy Tests:', () => {
      describe('set()', () => {
        beforeEach(() => {
          users = [...testUsers];
          users2 = testUsers.map((user) => user.username + 2);
          users3 = testUsers.map((user) => user.username + 3);
          users4 = testUsers.map((user) => user.username + 4);
          userNode = new Node('users', users);
          userNode2 = new Node('users2', users2);
          userNode3 = new Node('users3', users3);
          userNode4 = new Node('users4', users4);
          cache = new Cache();
        });

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

      describe('get()', () => {
        beforeEach(() => {
          users = [...testUsers];
          users2 = testUsers.map((user) => user.username + 2);
          users3 = testUsers.map((user) => user.username + 3);
          users4 = testUsers.map((user) => user.username + 4);
          userNode = new Node('users', users);
          userNode2 = new Node('users2', users2);
          userNode3 = new Node('users3', users3);
          userNode4 = new Node('users4', users4);
          const nodes = [userNode, userNode2, userNode3, userNode4];
          nodes.forEach((node) => {
            node.accessCount++;
          });
          cache = new Cache();
        });

        it('should refresh node position in the queue by moving it to the tail', () => {
          cache.set('users', users);
          cache.get('users');
          expect(cache.tail).toBe(cache.content['users']);
          expect(cache.tail).toEqual(userNode);
        });
      });

      describe('update()', () => {
        beforeEach(() => {
          users = [...testUsers];
          users2 = testUsers.map((user) => user.username + 2);
          users3 = testUsers.map((user) => user.username + 3);
          users4 = testUsers.map((user) => user.username + 4);
          userNode = new Node('users', users);
          userNode2 = new Node('users2', users2);
          userNode3 = new Node('users3', users3);
          userNode4 = new Node('users4', users4);
          cache = new Cache();
        });

        it('should move an existing node to the tail of the cache when a new value is passed into update with an existing key', () => {
          cache.set('users', users);
          cache.set('users2', users2);
          cache.update('users', users3);
          userNode3.keyRef = 'users';
          userNode3.accessCount = 2;
          userNode2.prev = null;
          userNode2.next = userNode3;
          userNode3.prev = userNode2;
          userNode3.next = null;
          expect(cache.size).toBe(2);
          expect(cache.head).toEqual(userNode2);
          expect(cache.tail).toBe(cache.head.next);
        });
      });
    });
    describe('LFU Eviction Policy Tests:', () => {
      beforeEach(() => {
        users = [...testUsers];
        users2 = testUsers.map((user) => user.username + 2);
        users3 = testUsers.map((user) => user.username + 3);
        users4 = testUsers.map((user) => user.username + 4);
        userNode = new Node('users', users);
        userNode2 = new Node('users2', users2);
        userNode3 = new Node('users3', users3);
        userNode4 = new Node('users4', users4);
        cache = new Cache();
      });

      it('should Evict the node with the lowest access count', () => {});
    });
  });
});
