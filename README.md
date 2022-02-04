<p align="center" style="width: 1000px; height: 600px;"><img src="./demo-app/client/images/transparentlogowithslogan.png" width='1000' style="margin-top: 10px;"></p>

# Qache

## What is Qache?
Qache is a modular utility class for handling server side caching of Data.

### Features
- Server-side caching implemented in one line: ```const qache = new Qache({});```
- Easy-to-use, modular caching methods, to get started... ```qache.set(key, value)``` then ```qache.get(key)```
- Full Suite of list methods, allowing users to create, read, update, and delete cache data on a per page, per category, or site-wide level.
- Lazy Invalidation! Optionally reset your cache after certain events if you can't figure out a way to maintain cache validity. Simply ```qache.invalidate()```
- Get diagnostics on your Cache, and see all it's contents! ```qache.log()```
- Cache Eviction Policies:
  - timeToLive: Qache tracks when each node stored was last accessed. By default data has an infinite timeToLive, to change this, pass into your options object `{timeToLive: NumberInMilliseconds}`
  - maxSize: Qache tracks how many keys/nodes exist, and upon reaching it's max, will begin to evict older data in order to add new data. This property is always true, and defaults to 5 nodes. To change this property, pass into your options object ```{maxSize: Number}```
  - LRU(default): Upon reaching max size, Qache will evict the Least Recently Accessed Node in cache
  - LFU: Upon reaching max size, Qache will evict the Least Frequently Used Node in Cache, determined by tracking access counts of each node. To switch to this policy, pass into your options object ```{evictionPolicy: "LFU"}```

### Contribute to Qache
All code changes happen through Github Pull Requests and we actively welcome them. To submit your pull request, follow the steps below:
## Pull Requests
1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests.
3. Be sure to comment on any code added.
5. Ensure the test suite passes.
6. Make sure your code lints.
7. Issue a Pull Request!

## Setting up the Dev Server, Demo, and Mongo DB
1. Clone this repo.
2. Run `npm install`.
3. `cd demo-app`
4. Run `npm install` once more
5. `npm start`

## Coding Style
2 spaces for indentation
80 character line length

A note on using the dev server: you must access the `/graphql` route on port 8080.
