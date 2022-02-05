const Node = require('./Node');

class Qache {
  constructor({
    timeToLive = Infinity,
    maxSize = 5,
    evictionPolicy = 'LRU',
  } = {}) {
    //set timeToLive in options or default to 10min
    this.TTL = timeToLive; //10 minute default timeToLive
    this.maxSize = maxSize; // 5 node default maximum size
    this.policyType = evictionPolicy;

    this.content = {}; // STORE OF NODES
    this.size = 0; // current size of cache
    this.tail = this.head = null; // pointers to head(dequeue)/tail(enqueue) of queue
    console.log('Qache Cache Starting Up');
  }

  get(key) {
    this.cleanUp(key);
    return this._getDataFromQueue(key);
  }

  set(key, value) {
    this._addToQueueAndCache(key, value);
  }

  //Creates a list, with a unique key identifier. Option to add items to this list on creation.
  // It will be strongly advised to only create a list once it's full and complete content is available for storage.
  listCreate(listKey, items) {
    if (listKey === undefined) {
      console.log('Error, listCreate requires a unique cache key');
    } else {
      //Check if a list exists for this key, if not, create one.
      if (this.content[listKey] === undefined) {
        console.log('adding to queue and cache');
        this._addToQueueAndCache(listKey, []);
      }
      // for each item given, we push that item into cache, THEN refresh expiration.
      items.forEach((item) => this.content[listKey].value.push(item));
    }
  }
  //Check if list exists, if exists, assumed fresh and complete, returns by range or if no range specified, returns all.
  listRange(listKey, start = 0, end = Infinity) {
    this.cleanUp(listKey);

    if (this.content[listKey] === undefined) return null;

    const { value } = this.content[listKey];
    this._refresh(listKey);

    return value.slice(start, end);
  }

  //**Update an item if found, push item if not found.**

  listUpsert(item, filterObj, ...listKeys) {
    //Remind user that a key is required for this method
    if (listKeys === undefined) {
      console.log('Error, listPush requires atleast one unique cache key');
    } else {
      //Check if a list exists for this key, if not skip
      for (const listKey of listKeys) {
        if (this.content[listKey] === undefined) {
          continue;
        }
        //We push that item into cache, THEN refresh expiration.
        let found = false;
        for (const oldItem of this.content[listKey].value) {
          for (const key in filterObj) {
            if (oldItem[key] === filterObj[key]) {
              found = true;
              Object.assign(oldItem, item);
            }
          }
        }
        if (!found) this.content[listKey].value.push(item);
        this.content[listKey].expires = Date.now() + this.TTL;
      }
    }
  }
  // Push a newly created item to ONE OR MANY lists
  listPush(item, ...listKeys) {
    //Remind user that a key is required for this method
    if (listKeys === undefined) {
      console.log('Error, listPush requires atleast one unique cache key');
    } else {
      //Check if a list exists for this key, if not, skip
      for (const listKey of listKeys) {
        if (this.content[listKey] === undefined) {
          continue;
        }
        //We push that item into cache, THEN refresh expiration.
        this.content[listKey].value.push(item);
        this.content[listKey].expires = Date.now() + this.TTL;

        this._refresh(listKey);
      }
    }
  }

  // Support for Delete Mutations to keep cache fresher longer
  // The array of listKeys should be every key the developer wants to remove a specific item from.
  // It should be every list the item belongs to, ideally.
  // EX. cache.listRemove({name: "Fancy Chair"}, "livingRoomFurniture", "kitchenFurniture"})
  // removes all items with name === "Fancy Chair" from cache lists with keys "livingRoomFurniture" and "kitchenFurniture"
  listRemoveItem(filterObject, ...listKey) {
    // Option to specify if each list only contains the item once.
    let unique = false;
    if (filterObject.hasOwnProperty('unique')) {
      unique = filterObject.unique;
      delete filterObject.unique;
    }
    // Some intuition that if the ID key exists the item must be unique to each list.
    if (
      filterObject.hasOwnProperty('id') ||
      filterObject.hasOwnProperty('ID') ||
      filterObject.hasOwnProperty('_id')
    ) {
      unique = true;
    }
    //Loops through each listKey
    for (const key of listKey) {
      // **Cleanup protocol** - remove item if past expiration, if not, refresh expiration.
      this.cleanUp(key);
      if (this.content[key] !== undefined) {
        this.content[key].expires = Date.now() + this.TTL;
      } else {
        // If key is undefined, skip key.
        continue;
      }
      // **Cleanup protocol**

      //Loops through each list to find the item. using a unique identifier, such as the items id
      const currentList = this.content[key].value;
      for (const item of currentList) {
        let missing = false;
        //Loop through filterObject, and if one filter is missing set off flag, and skip to next item in list.
        for (let filter in filterObject) {
          if (item[filter] !== filterObject[filter]) {
            missing = true;
            break;
          }
        }
        //if flag was never set off, remove item from list
        if (!missing) {
          const index = currentList.indexOf(item);
          currentList.splice(index, 1);
          if (unique) break;
        }
      }
      this._refresh(key);
    }
  }
  //Very similar to listRemoveItem but updates the item instead of deleting it from list
  listUpdate(filterObject, newItem, ...listKey) {
    // Option to specify if each list only contains the item once.
    let unique = false;

    // Some intuition that if the ID key exists the item must be unique to each list.
    if (
      filterObject.hasOwnProperty('id') ||
      filterObject.hasOwnProperty('ID') ||
      filterObject.hasOwnProperty('_id')
    ) {
      unique = true;
    }
    // If our inuition isn't what the dev wants, they can specify otherwise.
    if (filterObject.hasOwnProperty('unique')) {
      unique = filterObject.unique;
      // delete this key because we don't want to loop over it for item validation
      delete filterObject.unique;
    }
    //Loops through each listKey
    for (const key of listKey) {
      // **Cleanup protocol** - remove item if past expiration, if not, refresh expiration.
      this.cleanUp(key);
      if (this.content[key] !== undefined) {
        this.content[key].expires = Date.now() + this.TTL;
      } else {
        // If key is undefined, skip key.
        continue;
      }
      // **Cleanup protocol**
      //Loops through each list to find the item. using a unique identifier, such as the items id
      const currentList = this.content[key].value;
      for (const item of currentList) {
        let missing = false;
        //Loop through filterObject, and if one filter is missing set off flag, and skip to next item in list.
        for (let filter in filterObject) {
          if (item[filter] !== filterObject[filter]) {
            missing = true;
            break;
          }
        }
        //if flag was never set off, update item in list
        if (!missing) {
          Object.assign(item, newItem);
          if (unique) break;
        }
      }
      this._refresh(key);
    }
  }

  //If list exists, assumed fresh complete, returns filtered results
  //              FILTEROBJECT - looks like - {username: "xyz", age: 23}
  listFetch(listKey, filterObject) {
    this.cleanUp(listKey);
    // Check if list exists, if not return null.
    if (this.content[listKey] === undefined) return null;

    this._refresh(listKey);

    const returnList = [];
    // Option to specify if each list only contains the item once.
    let unique = false;
    // Some intuition that if the ID key exists the item must be unique to each list.
    if (
      filterObject.hasOwnProperty('id') ||
      filterObject.hasOwnProperty('ID') ||
      filterObject.hasOwnProperty('_id')
    ) {
      unique = true;
    }
    // If our inuition isn't what the dev wants, they can specify otherwise.
    if (filterObject.hasOwnProperty('unique')) {
      unique = filterObject.unique;
      // delete this key because we don't want to loop over it for item validation
      delete filterObject.unique;
    }
    // If list does exist, loop through list and find item by filter Object
    for (const item of this.content[listKey].value) {
      //create a flag to set off if  a filter is not matching
      let missing = false;
      //Loop through filterObject, and if one filter is missing set off flag, and skip to next item in list.
      for (let filter in filterObject) {
        if (item[filter] !== filterObject[filter]) {
          missing = true;
          break;
        }
      }
      //if flag was never set off, add item to filtered list
      if (!missing) {
        returnList.push(item);
        if (unique) break;
      }
    }
    //refresh list expiration since it has been accessed
    this.content[listKey].expires = Date.now() + this.TTL;

    //if filtered list is empty, return null
    if (returnList.length === 0) return null;

    //if non empty return results
    return returnList;
  }
  // Option to invalidate certain lists, or items and remove them from cache, for certain mutations.
  invalidate(...keys) {
    //Clears cache if no keys are specified
    if (keys === undefined) {
      this.clear();
    }
    //Clears specific keys and adjusts size property if key exists.
    for (let key of keys) {
      if (this.content[key] !== undefined) {
        delete this.content[key];
        this.size--;
      }
    }
  }

  /* {UTILITY METHODS} */
  //Cleans up stale data
  cleanUp(key) {
    //Evict a stale key if key is provided
    if (key !== undefined && this.content[key] !== undefined) {
      if (this.content[key].expires < Date.now()) {
        this._removeFromQueueAndCache(this.content[key]);
      }
    }
    //Option to cleanUp all keys if need arises
    else {
      for (const key in this.content) {
        if (this.content[key].expires < Date.now()) {
          this._removeFromQueueAndCache(this.content[key]);
        }
      }
    }
  }
  //count amount of keys
  size() {
    return this.size;
  }

  // wipe the cache
  clear() {
    this.content = {};
    this.size = 0;
    this.tail = this.head = null;
  }

  log() {
    console.log(Object.keys(this.content));
    console.log(`Size: ${this.size}`);
    console.log(`Size is valid: ${this._isSizeValid()}`);
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
    let nodeInCache = this.content[key];

    if (this.policyType === 'LRU') {
      // the node is already in the cache, so we must remove the old one so that our new node is inserted at the tail of the queue.
      if (nodeInCache) {
        // we only remove from queue and NOT cache since we are just enqueueing this node
        this._refresh(key);
      }
      // when the cache is full, we dequeue the head from the cache/queue
      else if (this.size === this.maxSize) {
        this._removeFromQueueAndCache(this.head);
        this.size--;
      }
      //key doesn't exist
      if (!nodeInCache) {
        nodeInCache = new Node(key, value);
        nodeInCache.expires = Date.now() + this.TTL;
        this.size++;
        // enqueue node if it exists, otherwise enqueue new node with value
        this._enqueue(nodeInCache);
        // assign key to new node
        this.content[key] = this.tail;
      }
    } else if (this.policyType === 'LFU') {
      // key exists in cache
      if (nodeInCache) {
        nodeInCache.accessCount++;
        this._refresh(key);
        //key doesn't exist, and cache at max size
      } else if (this.size === this.maxSize) {
        this._removeFromQueueAndCache(this.head);
        this.size--;
      }
      // key doesn't exist
      if (!nodeInCache) {
        //create new node
        nodeInCache = new Node(key, value);
        nodeInCache.expires = Date.now() + this.TTL;
        this.size++;

        //Place node at head/cold side of queue
        this._enqueue(nodeInCache);

        // assign key to new node
        this.content[key] = this.head;
      }
    }
  }

  /**
   * Move accessed node in cache to the tail of the queue (remove it from queue and then enqueue it)
   * @param {object} key
   */
  _refreshRecent(existingNode) {
    this._removeFromQueue(existingNode);
    this._enqueue(existingNode);
  }

  _refreshFrequent(existingNode) {
    this._bubbleSort(existingNode);
  }

  _refresh(key) {
    const existingNode = this.content[key];

    if (existingNode) {
      existingNode.accessCount++;

      if (this.policyType === 'LRU') {
        this._refreshRecent(existingNode);
      } else if (this.policyType === 'LFU') {
        this._refreshFrequent(existingNode);
      } else {
        throw new Error('Policy type does not exist');
      }
    }
  }

  _bubbleSort(node) {
    console.log(this);
    // 0 node list
    if (!node) return;
    // 1 node list OR 2+ node list where node is tail
    if (node === this.tail) return;

    // 2+ node list
    while (node.next && node.next.accessCount < node.accessCount) {
      console.log('~~~~~~~~~~~~~~Sorting...~~~~~~~~~~~~~~');
      if (node === this.head) {
        this.head = node.next;

        //2 node list where node is head
        if (!node.next.next) {
          this.tail = node;

          node.next.prev = null;
          node.next.next = node;

          node.next = null;
          node.prev = this.head;
          break;
        }

        //3+ node list where node is head
        const temp = node.next.next;
        temp.prev = node;

        node.next.prev = null;
        node.next.next = node;

        node.next = temp;
        node.prev = this.head;
      } else {
        //3 node list where node is not head
        // A > B > C  swap B with C
        if (!node.next.next) {
          this.tail = node;

          const temp = node.next;

          node.prev.next = temp;

          temp.prev = node.prev;
          temp.next = node;

          node.prev = temp;
          node.next = null;

          break;
        }
        //swap with next
        //   node
        // A > B > C > D
        //Point A's 'next' to C
        node.prev.next = node.next;
        //Point D's 'prev' to B
        node.next.next.prev = node;

        //Swap C's prev and next pointers
        const temp = node.next.next;
        node.next.prev = node.prev;
        node.next.next = node;

        //Swap B's prev and next pointers
        node.prev = node.next;
        node.next = temp;
      }
      node = node.next;
    }
  }

  /**
   * Add node to the tail of the DLL (enqueue it)
   * When we call enqueue, we assume we are enqueing a new node or existing node that is "floating" without pointing to any other nodes
   * @param {object} key
   */
  _enqueue(node) {
    // insert new node at tail of the linked list (queue)
    if (this.policyType === 'LRU') {
      if (this.tail) {
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
      } else this.tail = this.head = node;
      // queue is empty. point head & tail ➡ new Node
    } else if (this.policyType === 'LFU') {
      if (this.head) {
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
      } else this.tail = this.head = node;
    }
  }
  /**
   * Removes a node from the queue and deletes the corresponding data from the cache
   * @param {object} key
   */

  _removeFromQueueAndCache(node) {
    delete this.content[node.keyRef];
    this._removeFromQueue(node);
    this.size--;
  }

  _removeFromQueue(node) {
    if (!node.next && !node.prev) {
      this.head = this.tail = null;
    } else if (!node.next) {
      node.prev.next = null;
      this.tail = node.prev;
    } else if (!node.prev) {
      node.next.prev = null;
      this.head = node.next;
    } else {
      node.next.prev = node.prev;
      node.prev.next = node.next;
    }
  }

  _getDataFromQueue(key) {
    const nodeInCache = this.content[key];

    if (!nodeInCache) {
      console.log(`There is no key: ${key} in the cache.`);
      return null;
    }

    this._refresh(key);

    return nodeInCache.value;
  }

  _isSizeValid() {
    return this.size === Object.keys(this.content).length;
  }
}

module.exports = Qache;
