class Node {
  constructor(keyRef, value) {
    this.keyRef = keyRef;
    this.value = value;
    this.prev = this.next = null;
    this.expires = Infinity;
    this.accessCount = 1;
  }
}

module.exports = Node;
