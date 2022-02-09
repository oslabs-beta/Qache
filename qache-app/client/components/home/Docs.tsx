import { HashLink as Link } from 'react-router-hash-link';
import Navbar from './Navbar';
import '../../styles/home-styles/Docs.scss'

const scrollWithOffset = (el:any) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -120; 
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}


const Docs = () => {
  return (
  <>
      <Navbar/>
      <div id="docs">
        {/* SIDE NAVIGATION BAR */}
        <div id="docs-nav">
          <Link to={'/docs/#quick-start'}><strong>Quick Start</strong></Link>
          <ul>
            <li><Link to={'/docs/#install'} scroll={el => scrollWithOffset(el)}>Install</Link></li>
            <li><Link to={'/docs/#instantiate'} scroll={el => scrollWithOffset(el)}>Instantiate</Link></li>
            <li><Link to={'/docs/#set'} scroll={el => scrollWithOffset(el)}>Set Your First Key</Link></li>
            <li><Link to={'/docs/#get'} scroll={el => scrollWithOffset(el)}>Get Your Data</Link></li>
          </ul>
          <Link to={'/docs/#commands'}><strong>Commands</strong></Link>
          <ul>
            <li><Link to={'/docs/#getcommand'} scroll={el => scrollWithOffset(el)}>get</Link></li>
            <li><Link to={'/docs/#setcommand'} scroll={el => scrollWithOffset(el)}>set</Link></li>
            <li><Link to={'/docs/#update'} scroll={el => scrollWithOffset(el)}>update</Link></li>
            <li><Link to={'/docs/#delete'} scroll={el => scrollWithOffset(el)}>delete</Link></li>
            <li><Link to={'/docs/#listCreate'} scroll={el => scrollWithOffset(el)}>listCreate</Link></li>
            <li><Link to={'/docs/#listRange'} scroll={el => scrollWithOffset(el)}>listRange</Link></li>
            <li><Link to={'/docs/#invalidate'} scroll={el => scrollWithOffset(el)}>invalidate</Link></li>
            <li><Link to={'/docs/#listPush'} scroll={el => scrollWithOffset(el)}>listPush</Link></li>
            <li><Link to={'/docs/#listFetch'} scroll={el => scrollWithOffset(el)}>listFetch</Link></li>
            <li><Link to={'/docs/#listUpdate'} scroll={el => scrollWithOffset(el)}>listUpdate</Link></li>
            <li><Link to={'/docs/#listUpsert'} scroll={el => scrollWithOffset(el)}>listUpsert</Link></li>
            <li><Link to={'/docs/#listRemoveItem'} scroll={el => scrollWithOffset(el)}>listRemoveItem</Link></li>
          </ul>
          <Link to={'/docs/#faq'} scroll={el => scrollWithOffset(el)}><strong>FAQ</strong></Link>
        {/* CONTENT SECTION */}
        </div>
        <div id="docs-content">
          <div id="quick-start">
            <strong>Quick Start</strong>
            <a id="install" className='anchor'>
              <div className='section'>
                <p className='title'>Installation</p>
                <p className='body'>Installation is a very simple process. Start with a quick npm install qache</p>
                <div className='code-block'>
                  <code>npm install qache</code>
                </div>
                <p className='body'>This will add qache to your servers dependencies. Then, choose a home for your cache, somewhere where you can easily reference it, it is reccomended to be in the same file that you make your database calls.</p>
              </div>
            </a>
            <div id="instantiate" className='section'>
              <p className='title'>Instantiate</p>
              <p className='body'>Once you have picked a file to set up your cache, the process is simple.</p>
              <div className='code-block'>
                <code><code className='b'>const</code> Qache = <code className='b'>require</code>(<code className='y'>'qache'</code>) <code className='gr'>//require in qache</code></code><br/>
                <code><code className='b'>const</code> cache = <code className='r'>new</code> <code className='g'>Qache</code>() <code className='gr'>//This line will create a default instance of our Qache</code></code>
              </div>
              <p className='body'>
                Awesome, with those two lines, every time you run your server, you have access to powerful caching capabilities!<br/>
                Now you have some decisions to make, in particular, some settings to choose.
              </p>
              <div className='code-block'>
                <code>
                <code className='b'>const</code> policies = {'{'} <br/>
                &nbsp;&nbsp;timeToLive: <code className='p'>1000</code><code className='r'>*</code><code className='p'>60</code><code className='r'>*</code><code className='p'>10</code><code className='gr'> //time is expected in ms, this line represents 10min</code><br/>
                &nbsp;&nbsp;maxSize: <code className='p'>100</code><br/>
                &nbsp;&nbsp;evictionPolicy: <code className='y'>"LFU"</code><br/>
                {'}'}<br/>
                <code className='b'>const</code> cache = <code className='r'>new</code> <code className='g'>Qache</code>(policies)<code className='gr'>// Pass your policies into the constructor like so</code>
                </code>
              </div>
              <p className='body'>
                All of these fields are optional, but something to think about.<br/>
                The built-in defaults are LRU(Least Recently Used) optionally pick LFU(Least Frequently Used), no max size, and infinite time to live.
                If you do have a ton of data in your database and cant cache everything, it's reccomended to put some limitations on either maxSize or timeToLive
              </p>
            </div>
            <div id="set" className='section'>
              <p className='title'>Set Your First Key</p>
              <p className='body'>
                To start caching data all we have to do is set our first key!<br/>
                Keep in mind, we need to catch the data after the database response but before the return.
              </p>
              <div className='code-block'>
                <code>
                  <code className='g'>getProductById</code>: <code className='r'>async</code> <code className='b'>function</code>(args){'{'}<br/>
                  &nbsp;&nbsp;<code className='b'>const</code> data <code className='r'>=</code> <code className='r'>await</code> Product.<code className='g'>findOne</code>(args.id);<code className='gr'> //Your standard DB query</code><br/>
                  &nbsp;&nbsp;cache.<code className='g'>set</code>(args.id, data);<code className='gr'> //add this new data to cache</code><br/>
                  &nbsp;&nbsp;<code className='r'>return</code> data;<br/>
                  {'}'}
                </code>
              </div>
                <p className='body'>Congrats! You just added your first piece of data to cache... but something is missing.</p>
            </div>
            <div id="get" className='section'>
              <p className='title'>Get Your Data</p>
              <p className='body'>What would be the point of adding data to cache, without using it.</p>
              <div className='code-block'>
                <code>
                  <code className='g'>getProductById</code>: <code className='r'>async</code> <code className='b'>function</code>(args){'{'}<br/>
                  &nbsp;&nbsp;<code className='b'>const</code> cacheResponse <code className='r'>=</code> cache.<code className='g'>get</code>(args.id); <code className='gr'> //Check the cache under the unique key id</code><br/>
                  &nbsp;&nbsp;<code className='r'>if</code>(cacheResponse) <code className='r'>return</code> cacheResponse;<code className='gr'> // If the cache has what we're looking for, we return it.</code><br/><br/>
                  &nbsp;&nbsp;<code className='b'>const</code> data <code className='r'>=</code> <code className='r'>await</code> Product.<code className='g'>findOne</code>(args.id);<code className='gr'> //Your standard DB query</code><br/>
                  &nbsp;&nbsp;cache.<code className='g'>set</code>(args.id, data);<code className='gr'> //add this new data to cache</code><br/>
                  &nbsp;&nbsp;<code className='r'>return</code> data;<br/>
                  {'}'}
                </code>
              </div>
              <p className='body'>
                Now that's what we're talking about! In 5 lines, we check our cache, and set the data to cache if it wasn't found the first time.<br/>
                Below find a complete list of the commands, and be sure to keep in mind maintaining the validity of your data.<br/> 
                There are commands for every mutation!
              </p>
              </div>
          </div>

          <div id="commands">
            <strong>Commands</strong>
              <div id="getcommand" className='section'>
                <p className='title'>get(key)</p>
                <p className='time'>Time Complexity: O(1)</p>
                <p className='body'>Used to retrieve data stored under a predetermined key. See "Set" below</p>
              </div>
              <div id="setcommand" className='section'>
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
            <strong>FAQ</strong>
            <div className='section'>
              <p className='title'>How is Qache different from other key-value stores?</p>
              <p className='body'>
                Qache's main draw is ease of use, and it's gentle learning curve. But behind that, lies a powerful and modular suite of methods to handle complex situations.<br/>
                Everything is handled in the same server being serviced by the cache. This means several things.<br/>
                <li>Qache horizontally scales in tandem with servers. Each server AUTOMATICALLY has it's own instance of qache! Keep in mind however that you will need to adopt an aproach such as employing a service worker process to handle cache updates.</li>
                <li>Qache requires very little upkeep after it's initial set up.</li>
                <li>In most cases Qache fits perfectly into an ACID compliant system, and can be integrated into existing systems with ease.</li>
              </p>
            </div>
            <div className='section'>
              <p className='title'>Will a Qache ever be a bottleneck for my server?</p>
              <p className='body'>
                It is nearly impossible for Qache to be the bottleneck of your server. We set out to break apart the bottlenecks that come with high traffic sites, or large amounts of database queries, even more specifically GraphQL queries, which are known to sometimes make multiple DB queries in a single request.<br/>
                We accomplished that task, and surpassed our expectations.<br/>
                To be more specific, every Qache read operation can be constant time, or if neccesary, for say filtered results, linear. This means Qache can get through millions of requests without ever getting bogged down.
              </p>
            </div>
            <div className='section'>
              <p className='title'>Is there a way to control how much memory is used?</p>
              <p className='body'>
                We have set up a few powerful settings that allow for you to use up as much or as little memory as you want. set a max key limit or set short expiration dates.<br/>
                If those settings don't suffice, you can take further steps to store your data in stringified form, and parse it, when you receive it back. 
              </p>
            </div>
            <div className='section'>
              <p className='title'>What's a good strategy for keeping data in cache accurate?</p>
              <p className='body'>
                It varies from case to case. But the greatest rule of thumb is this. If a request is making an update, you should also update the cache. And the same goes for deleting and creating. Whatever database action is happening, mirror it with a cache action.<br/>
                If the idea of an inaccurate cache scares you, cache.invalidate() after every mutation will ease your worries!
              </p>
            </div>
            <div className='section'>
              <p className='title'>How is Qache pronounced?</p>
              <p className='body'>
                kwaash :{')'}
              </p>
            </div>
          </div>

        </div>
      </div>
  </>
  );
};

export default Docs;
