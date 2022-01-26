const Qachengo = require('../Qachengo/Qachengo');

describe('Queue Tests', () => {
  const myQueue = new Queue();

  it('should consist of two Stacks', () => {
    expect(myQueue.stack1).toBeDefined();
    expect(myQueue.stack1).toBeInstanceOf(Stack);
    expect(myQueue.stack2).toBeDefined();
    expect(myQueue.stack2).toBeInstanceOf(Stack);
  });

  it('should have an enqueue method', () => {
    expect(myQueue.enqueue).toBeDefined();
    expect(typeof myQueue.enqueue).toBe('function');
  });

  it('should have a dequeue method', () => {
    expect(myQueue.dequeue).toBeDefined();
    expect(typeof myQueue.dequeue).toBe('function');
  });

  it('should return undefined if nothing to dequeue', () => {
    expect(myQueue.dequeue()).toBeUndefined();
  });

  it('should add and remove values from queue based on first in, first out rule', () => {
    myQueue.enqueue(1);
    myQueue.enqueue(2);
    myQueue.enqueue(3);
    expect(myQueue.dequeue()).toBe(1);
    expect(myQueue.dequeue()).toBe(2);
    expect(myQueue.dequeue()).toBe(3);
  });
});
