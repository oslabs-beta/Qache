const Cache = require('../Qachengo/Qachengo');
const Node = require('../Qachengo/Node');

describe('Qachengo Tests', () => {
  let myCache;

  beforeEach(() => {
    myCache = new Cache();
  });

  it('should have properties for: TTL, maxSize, content, size, head, tail', () => {
    expect(myCache.TTL).toBeDefined();
    expect(myCache.maxSize).toBeDefined();
    expect(myCache.content).toBeDefined();
    expect(myCache.size).toBeDefined();
    expect(myCache.head).toBeDefined();
    expect(myCache.tail).toBeDefined();
  });

  it('should store data in the content property as an instance of Node', () => {
    expect(myCache.content['asdf']).toBeInstanceOf(Node);
  });

  it('should have an enqueue method', () => {
    expect(myCache.enqueue).toBeDefined();
    expect(typeof myCache.enqueue).toBe('function');
  });

  it('should have a dequeue method', () => {
    expect(myCache.dequeue).toBeDefined();
    expect(typeof myCache.dequeue).toBe('function');
  });

  it('should return undefined if nothing to dequeue', () => {
    expect(myCache.dequeue()).toBeUndefined();
  });

  it('should add and remove values from queue based on first in, first out rule', () => {
    myCache.enqueue(1);
    myCache.enqueue(2);
    myCache.enqueue(3);
    expect(myCache.dequeue()).toBe(1);
    expect(myCache.dequeue()).toBe(2);
    expect(myCache.dequeue()).toBe(3);
  });
});
