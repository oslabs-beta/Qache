class Node {
  constructor(keyRef, value) {
    this.keyRef = keyRef;
    this.value = value;
    this.prev = this.next = null;
    this.expires = Infinity;
  }
}

module.exports = Node;
