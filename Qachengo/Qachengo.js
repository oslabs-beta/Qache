class Node {
  constructor(value) {
    this.value = value;
    this.prev = this.next = null;
  }
}

class Cache {
  constructor(options = { timeToLive: 1000 * 60 * 10, maxSize: 5 }) {
    //set timeToLive in options or default to 10min
    this.TTL = options.timeToLive; //10 minute default timeToLive
    //Prevents excessive cleanups
    this.maxSize = options.maxSize;
    this.lastCleanup = 0;
    // Where data, and key specific data lives
    this.content = {}; // STORE OFue/f  DATA
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
  _addToQueueAndCache(key, value) {
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
      const node = new Node(value);
      node.next = this.tail;
      this.tail.prev = node;
      this.tail = node;
    }
    // queue is empty. point head & tail ➡ new Node
    else this.tail = this.head = new Node(value);

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

  _getDataFromQueue(key) {
    try {
      const nodeInCache = this.content[key];
      if (!nodeInCache)
        throw new Error(`There is no key: ${key} in the cache.`);
      // put newly accessed node at the tail of the list
      if (this.tail !== nodeInCache) {
        // recall that _addToQueueAndCache will remove existing node and add the node back at the tail of the queue
        this._addToQueueAndCache(key, nodeInCache.value);
      }
      return nodeInCache.value.data;
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
   * When called with thue/f e 'next' string passed in:
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
    this._storeData(fields, dbResponse);
  }

  _getRefs(info) {
    return this.parseQuery(info.operation.selectionSet.selections);
  }

  _storeData(fields, dbResponse) {
    const isObject = (x) => typeof x === 'object' && x !== null;

    console.log('dbRes:', dbResponse, '\n', 'fields:', fields);
    if (fields.length === 1) {
      console.log('field: ', fields[0], '\n');
      this._addToQueueAndCache(fields[0], {
        data: dbResponse,
        expires: Date.now() + this.TTL,
      });
    } else {
      for (const field in dbResponse) {
        if (isObject(dbResponse[field])) {
          this._storeData(fields, dbResponse[field]);
        } else {
          this._addToQueueAndCache(field, {
            data: dbResponse[field],
            expires: Date.now() + this.TTL,
          });
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
          queryObj = this._getDataFromQueue(field);
        } else {
          this._addToQueryObj(field, this.content[field].value.data, queryObj);
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

  //for item lists, we will have unique cache keys per list.
  listPush(listKey, ...item) {
    //Remind user that a key is required for this method
    if (listKey === undefined) {
      console.log('Error, storeList requires a unique cache key');
    } else {
      //Check if a list exists for this key, if not, create one.
      if (this.content[listKey] === undefined) {
        this.content[listKey] = {
          list: [],
          expires: Date.now() + this.expiration,
        };
      }
      // for each item given, we push that item into cache, THEN refresh expiration.
      item.forEach((n) => this.content[listKey].list.push(n));
      this.content[listKey].expires = Date.now() + this.expiration;
    }
  }
  listPull(listKey, start = 0, end) {
    this.cleanUp(listKey);
    if (this.content[listKey] === undefined) return null;
    const { list } = this.content[listKey];
    return end ? list.slice(start, end) : list.slice(start);
  }
  listFetch(listKey, targetKey, targetValue) {
    const returnArray = [];
    if (this.content[listKey] === undefined) return null;

    for (const item of this.content[listKey].list) {
      console.log(item[targetKey], targetValue);
      if (item[targetKey] === targetValue) {
        returnArray.push(item);
      }
    }
    if (returnArray.length === 0) return null;
    return returnArray;
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
