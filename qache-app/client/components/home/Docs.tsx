import { HashLink as Link } from 'react-router-hash-link';
import Navbar from './Navbar';
import '../../styles/home-styles/Docs.scss'

const Docs = () => {
  return (
  <>
      <Navbar/>
      <div id="docs">
        {/* SIDE NAVIGATION BAR */}
        <div id="docs-nav">
          <Link to={'/docs/#quick-start'}><strong>Quick Start</strong></Link>
          <ul>
            <li><Link to={'/docs/#install'}>Install</Link></li>
            <li><Link to={'/docs/#instantiate'}>Instantiate</Link></li>
            <li><Link to={'/docs/#set'}>Set</Link></li>
            <li><Link to={'/docs/#get'}>Get</Link></li>
          </ul>
          <Link to={'/docs/#commands'}><strong>Commands</strong></Link>
          <ul>
            <li><Link to={'/docs/#get'}>get</Link></li>
            <li><Link to={'/docs/#set'}>set</Link></li>
            <li><Link to={'/docs/#update'}>update</Link></li>
            <li><Link to={'/docs/#delete'}>delete</Link></li>
            <li><Link to={'/docs/#listCreate'}>listCreate</Link></li>
            <li><Link to={'/docs/#listRange'}>listRange</Link></li>
            <li><Link to={'/docs/#invalidate'}>invalidate</Link></li>
            <li><Link to={'/docs/#listPush'}>listPush</Link></li>
            <li><Link to={'/docs/#listFetch'}>listFetch</Link></li>
            <li><Link to={'/docs/#listUpdate'}>listUpdate</Link></li>
            <li><Link to={'/docs/#listUpsert'}>listUpsert</Link></li>
            <li><Link to={'/docs/#listRemoveItem'}>listRemoveItem</Link></li>
          </ul>
          <Link to={'/docs/#faq'}><strong>FAQ</strong></Link>
          <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
          </ul>
        {/* CONTENT SECTION */}
        </div>
        <div id="docs-content">
          <div id="quick-start">
            <strong>Quick Start</strong>
            <div id="install" className='section'>
              <p className='title'>Installation</p>
              <p className='body'>This is how you install it</p>
            </div>
            <div id="instantiate" className='section'>
              <p className='title'>Instantiate</p>
              <p className='body'>This is how you Instantiate it</p>
            </div>
            <div id="set" className='section'>
              <p className='title'>Set</p>
              <p className='body'>This is how you Set it</p>
            </div>
            <div id="get" className='section'>
              <p className='title'>Get</p>
              <p className='body'>This is how you Get it</p>
            </div>
          </div>

          <div id="commands">
            <strong>Commands</strong>
              <div id="get" className='section'>
                <p className='title'>get(key)</p>
                <p className='time'>Time Complexity: O(1)</p>
                <p className='body'>Used to retrieve data stored under a predetermined key. See "Set" below</p>
              </div>
              <div id="set" className='section'>
                <p className='title'>set(key, value)</p>
                <p className='time'>Time Complexity: O(1)</p>
                <p className='body'>Intended for storing singleton data, i.e. data with a unique identifier. This function has many uses, such as storing data by id, or by a username, so it can easily save you many trips to a database to retrieve those pieces of data.</p>
              </div>
              <div id="update" className='section'>
                <p className='title'>update(key, value)</p>
                <p className='time'>Time Complexity: O(1)</p>
                <p className='body'>Used to update data of a key that already exists</p>
              </div>
              <div id="delete" className='section'>
                <p className='title'>delete(key)</p>
                <p className='time'>Time Complexity: O(1)</p>
                <p className='body'>Intended to delete a key that should no longer be in cache, such as if an item was deleted out of the database, and the user wants the stored data in cache to stay fresh.</p>
              </div>
              <div id="invalidate" className='section'>
                <p className='title'>invalidate(...keys)</p>
                <p className='time'>Time Complexity: O(n) where n = amount of keys requiring deletion</p>
                <p className='body'>invalidate, or "lazy invalidation". This command can take in one or more keys, and delete the data, and the nodes associated with each key. If you run into an event that leads to a complicated situation when trying to keep data fresh and valid, consider invalidating the cache after such an event. We call this method lazy, because it is to be used as a last resort. We believe our methods can keep most sets of data fresh in cache for a long time.</p>
              </div>
              <div id="listCreate" className='section'>
                <p className='title'>listCreate(listKey, ...item)</p>
                <p className='time'>Time Complexity: O(1)</p>
                <p className='body'>Intended to store data in a systematic way. By page, by category, or by anything else that can identify a group. After you have retrieved a certain dataset, store it under a key that identifies that group, to retrieve it faster later.</p>
              </div>
              <div id="listRange" className='section'>
                <p className='title'>listRange(listKey, start, end)</p>
                <p className='time'>Time Complexity: O(1) if no range specified, otherwise O(n) where n is the length of the list</p>
                <p className='body'>Used to retrieve a list previously stored. You can return an entire array by just passing in the lists unique key, or you can get a range, to possibly display only the first 10, or last 20</p>
              </div>
              <div id="listFetch" className='section'>
                <p className='title'>listFetch(listKey, filterObject)</p>
                <p className='time'>Time Complexity: O(n) where n is the length of the list</p>
                <p className='body'>Used similarly to listRange, this function takes a filterObject. Pass in the key of whatever you want to filter by, and the value you're looking for, i.e. category: "couch" to recieve all results that match that description.</p>
              </div>
              <div id="listPush" className='section'>
                <p className='title'>listPush(item, ...listKeys)</p>
                <p className='time'>Time Complexity: O(1)</p>
                <p className='body'>This function can be used to add new items to existing list, say we just added a new listing and don't want to invalidate our cache, we can just listPush the new listing to the existing list.</p>
              </div>
              <div id="listUpdate" className='section'>
                <p className='title'>listUpdate(updatedItem, filterObject, ...listKey)</p>
                <p className='time'>Time Complexity: O(n) where n is the length of the list</p>
                <p className='body'>Used to update the value of items currently in a list. Similar to the previous function, if we want to maintain freshness of our cache, we can use this function to update each list that item belonged to. This method takes in a filterObject, which can be used with a unique identifier to find the item in need of updating.</p>
              </div>
              <div id="listUpsert" className='section'>
                <p className='title'>listUpsert(item, filterObject, ...listKeys)</p>
                <p className='time'>Time Complexity: O(n) where n is the length of the list</p>
                <p className='body'>This function is dual-purpose. Similar to both listPush and listUpdate, this method will scan one or many lists, for an item. THEN, if the item was found it updates it, and if the item was not found, it adds it. Very useful in tricky situations, when you don't know if an item has been included in your cache yet or not.</p>
              </div>
              <div id="listRemoveItem" className='section'>
                <p className='title'>listRemoveItem(filterObject, ...listKey)</p>
                <p className='time'>Time Complexity: O(n) where n is the length of the list</p>
                <p className='body'>As the name suggests, this function removes an item from one or many lists in cache, great for when something has been deleted from the database, and you want that to reflect instantly in your cache.</p>
              </div>
          </div>

          <div id="faq">

          </div>

        </div>
      </div>
  </>
  );
};

export default Docs;
