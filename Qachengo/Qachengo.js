class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = this.next = null;
  }
}

class Cache {
  constructor(options = { expiration: 1000 * 60 * 10, maxSize: 5 }) {
    //set expiration in options or default to 10min
    this.defaultExpiration = options.expiration; //10 minute default expiration
    //Prevents excessive cleanups
    this.maxSize = options.maxSize;
    this.lastCleanup = 0;
    // Where data, and key specific data lives
    this.content = {}; // STORE OF DATA
    this.size = 0; // current size of cache
    this.tail = this.head = null; // pointers to head(dequeue)/tail(enqueue) of queue
  }

  /**
   * This function performs the following in order:
   * 1. Checks if the node exists in the cache and removes it if found. This behavior enforces that a new node with the same value as an existing node in memory overwrites the existing one and is enqueued to the tail since it is the most recently used data.
   * 2. Alternatively checks to see if the cache is full and then deletes the data from the cache and queue.
   * 3. Enqueues a new node at the tail of the queue
   * @param {string} key
   * @param {object} value
   */
  _addToQueue(key, value) {
    const nodeInCache = this.content[key];
    // the node is already in the cache, so we must remove the old one so that our new node is inserted at the tail of the queue.
    if (nodeInCache) {
      this._removeFromQueue(nodeInCache);
      this.size--;
    }
    // when the cache is full, we delete the node from the cache and the queue
    else if (this.size === this.maxSize) {
      delete this.content[this.head.key]; // remove from cache
      this._removeFromQueue(this.head);
      this.size--;
    }

    // insert new node at tail of the linked list (queue)
    if (this.tail) {
      const node = new Node(key, value);
      node.next = this.tail;
      this.tail.prev = node;
      this.tail = node;
    }
    // queue is empty. point head & tail ➡ new Node
    else this.tail = this.head = new Node(key, value);

    // add node to cache
    this.content[key] = this.tail;
    this.size++;
  }

  /**
   * Deletes a node from the queue
   * @param {object} node
   */
  _removeFromQueue(node) {
    // point node's `prev` pointer to the appropriate node
    this._detachNeighbor(node, 'prev');
    // point node's `next` pointer to the appropriate node
    this._detachNeighbor(node, 'next');
  }

  _getFromQueue(key) {
    try {
      const nodeInCache = this.content[key];
      if (!nodeInCache)
        throw new Error(`There is no key: ${key} in the cache.`);
      // put newly accessed node at the tail of the list
      if (this.tail !== nodeInCache) {
        // recall that _addToQueue will remove existing node and add the node back at the tail of the queue
        this._addToQueue(key, nodeinCache.value);
      }
      return nodeInCache.value;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * This helper function juggles pointers on either the head or tail of the queue.
   * When called with the 'prev' string passed in:
   * 		- If node.prev points to another node (current node is not the most recent thing to be added to the queue), point that node's `next` to the next node after the current node being deleted.
   * 		- Otherwise, node.prev does not point to a node (current node must be the most recent addition to the queue), thus we point the tail at the next node because we are at the tail of the queue.
   *
   * When called with the 'next' string passed in:
   * 		- If node.next points to another node (current node is not the least used node in the cache), point that node's `prev` to the node before the current node being deleted in the queue.
   * 		- Otherwise, node.next does not point to a node (current node must be the oldest item in the queue), thus we point the head at the previous node because we are at the head of the queue.
   *
   * @param {object} node
   * @param {string} p1
   */
  _detachNeighbor(node, p1) {
    const p2 = p1 === 'prev' ? 'next' : 'prev'; // pointer for the opposite direction passed in
    const end = p1 === 'prev' ? 'tail' : 'head'; // pointer for which end of queue we are removing from
    const neighbor = node[p1];
    if (neighbor) neighbor[p2] = node[p2];
    else this[end] = node[p2];
  }

  // wipe the cache
  clear() {
    this.content = {};
    this.size = 0;
    this.tail = this.head = null;
  }

  // Store data into Cache
  // FLOW : store ➡ getRefs ➡ _storeData
  store(info, dbResponse) {
    const { fields } = this._getRefs(info);
    console.log(fields, dbResponse);
    this._storeData(fields, dbResponse);
  }

  _getRefs(info) {
    return this.parseQuery(info.operation.selectionSet.selections);
  }

  _storeData(fields, dbResponse) {
    const isObject = (x) => typeof x === 'object' && x !== null;

    if (fields.length === 1) {
      this.content[fields[0]] = {
        data: dbResponse,
        expires: Date.now() + this.defaultExpiration,
      };
    } else {
      for (const field in dbResponse) {
        if (isObject(dbResponse[field])) {
          this._storeData(fields, dbResponse[field]);
        } else {
          // this.content[field] = {
          //   value: dbResponse[field],
          //   expires: Date.now() + this.defaultExpiration,
          // };
          this._addToQueue(field, {
            data: dbResponse[field],
            expires: Date.now() + this.defaultExpiration,
          });
          this.size++; // add to size of cache
        }
      }
    }
  }

  //Check for key, and return value if found
  //FLOW: check > _getRefs + parseQuery > _addToQueryObj > check returns
  check(info) {
    let { selections, fields, queryObj } = this._getRefs(info);
    let isMissingData = false;

    for (const field of fields) {
      //cleans stale data out of corresponding field
      this.cleanUp(field);
      if (this.content.hasOwnProperty(field)) {
        if (typeof queryObj === 'string') {
          // queryObj = this.content[field].value;
          queryObj = this._getFromQueue(field);
        } else {
          this._addToQueryObj(field, this.content[field].value, queryObj);
        }
      } else {
        isMissingData = true;
        break;
      }
    }
    return isMissingData ? null : queryObj;
  }

  _addToQueryObj(field, value, queryObj) {
    const isObject = (x) => typeof x === 'object' && x !== null;
    for (let key in queryObj) {
      if (isObject(queryObj[key])) {
        this._addToQueryObj(field, value, queryObj[key]);
      } else if (queryObj[key] === field) {
        queryObj[key] = value;
        return;
      }
    }
  }

  //Cleans up stale data
  cleanUp(key) {
    //Evict a stale key if key is provided
    if (key !== undefined && this.content[key] !== undefined) {
      if (this.content[key].expires < Date.now()) {
        delete this.content[key];
      }
    }
    //Option to cleanUp all keys if need arises
    else {
      for (const key in this.content) {
        if (this.content[key].expires < Date.now()) {
          delete this.content[key];
        }
      }
    }
  }

  /**
   * @param {object[]} selectionSet
   * @return {object} fields
   */
  parseQuery(selections, isTopLevel = true) {
    //Create a fields array to hold all REQUESTED FIELDS from GQL QUERY
    const fields = [];

    //Create a queryObj, to be the template for our return Obj
    const queryObj = {};
    // Loop through GraphQL field selections
    for (const selection of selections) {
      //if current field selection has subFields
      if (selection.selectionSet !== undefined) {
        //Parse through subfields, and deconstruct the fields and queryObj
        const result = this.parseQuery(
          selection.selectionSet.selections,
          false
        );
        const key = selection.name.value;
        //add subfields to final queryObj and Fields
        queryObj[key] = result.queryObj;
        fields.push(...result.fields);
      } else {
        // no selection set, so must be basic primitive field
        // Add to fields and queryObj
        const key = selection.name.value;
        queryObj[key] = selection.name.value;
        fields.push(selection.name.value);
      }
    }
    // if we are in the inital call before any recursion, we remove the top of the property associated with the returning query object to match the response from the database.
    const topLevelField = selections[0].name.value;
    //The topLevel Object is expected to not be included, so we add logic to omit
    return isTopLevel
      ? { fields, queryObj: queryObj[topLevelField] }
      : { fields, queryObj };
  }
  /* {UTILITY METHODS} */
  //count amount of keys
  size() {
    return Object.keys(this.content).length;
  }
}

module.exports = Cache;
