class Cache {
  constructor(options = { expiration: 1000 * 60 * 10 }) {
    //set expiration in options or default to 10min
    this.defaultExpiration = options.expiration; //10 minute default expiration
    //Prevents excessive cleanups
    this.lastCleanup = 0;
    // Where data, and key specific data lives
    this.content = {}; // STORE OF DATA
  }

  _getRefs(info) {
    return this.parseQuery(info.operation.selectionSet.selections);
  }

  _storeData(fields, dbResponse) {
    const isObject = (x) => typeof x === 'object' && x !== null;

    for (let field in dbResponse) {
      if (isObject(dbResponse[field])) {
        this._storeData(fields, dbResponse[field]);
      } else {
        this.content[field] = {
          value: dbResponse[field],
          expires: Date.now() + this.defaultExpiration,
        };
      }
    }
  }

  // Set data into Cache
  set(info, dbResponse) {
    const { fields } = this._getRefs(info);
    this._storeData(fields, dbResponse);
  }

  //Check for key, and return value if found
  check(info) {
    const { selections, fields, queryObj } = this._getRefs(info);

    let isMissingData = false;
    for (const field of fields) {
      //cleans stale data out of corresponding field
      this.cleanUp(field);

      if (this.content.hasOwnProperty(field)) {
        this._addToQueryObj(field, this.content[field].value, queryObj);
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
  //count amount of keys
  size() {
    return Object.keys(this.content).length;
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
}

module.exports = Cache;
