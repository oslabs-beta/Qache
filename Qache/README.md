# Qache

## What is Qache?
Qache is a utility class for handling server side caching of MongoDB queries made with GraphQL.

## Installation
Using npm:
```
$ npm i qache
```
In Node.js:
```
// Load the Qache class
var Qache = require('qache');

// Instantiate a cache
var cache = new Qache();
```
## Properties
- `content`
- `size`
- `maxSize`
- `TTL`

## Methods
- `get(key)`
- `set(key, value)`
- `listCreate(listKey, ...item)`
- `listRange(listKey, start, end)`
- `listPush(item, ...listKeys)`
- `listRemoveItem(filterObject, ...listKey)`
- `listUpdate(filterObject, newItem, ...listKey)`
- `listFetch(listKey,filterObject)`
- `invalidate(...keys)`

## Support
Tested in Node.js 16.13.0

[Automated unit tests](https://github.com/oslabs-beta/Qache/tree/dev/__tests__) are available.

See the complete [package source](https://github.com/oslabs-beta/Qache) for more details, as well as a fullstack demo application.
