class Cache {
  constructor(options = {expiration: 1000 * 60 * 10}) {
    //set expiration in options or default to 10min
    this.defaultExpiration = options.expiration; //10 minute default expiration
    //Prevents excessive cleanups
    this.lastCleanup = 0;

    // Where data, and key specific data lives
    this.content = {}; // STORE OF DATA
  }

  // Set data into Cache
  set(key, value) {
    //cleans stale data before all
    this.cleanUp(key);

    if (this.content[key]) {
      //Overwrite old data, resets expiration date... valuable for frequently used keys
      this.content[key] = {
        value,
        expires: Date.now() + this.defaultExpiration,
      };
    } else {
      //Create new key, set expiration date, based  off current date + expiration value
      this.content[key] = {
        value,
        expires: Date.now() + this.defaultExpiration,
      };
      this.size++;
    }
  }
  //Check for key, and return value if found
  check(key) {
    //cleans stale data before all
    this.cleanUp(key);

    if (this.content[key]) {
      return this.content[key].value;
    } else {
      return null;
    }
  }
  //Cleans up stale data
  cleanUp(key) {
    //Evict a stale key if key is provided
    if (key !== undefined) {
      if (this.content[key].expires < Date.now()) {
        delete this.content[key];
      }
    } 
    //Option to cleanUp all keys if need arises
    else {
      for(const key in this.content){
        if(this.content[key].expires < Date.now()){
          delete this.content[key]
        }
      }
    }
  }
  //count amount of keys
  size(){
    return Object.keys(this.content).length
  }
}

const cache = new Cache()

const fakeDBLookup = (fail) =>
  new Promise((resolve, reject) => {
    setTimeout((fail) => {
      if(fail) reject("failed")
      resolve("Hello World");
    }, 2000);
});


module.exports = Cache