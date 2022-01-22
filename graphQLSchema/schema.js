const { buildSchema } = require('graphql');
const Cache = require('../Qachengo/Qachengo');
const gql = require('graphql-tag');

const cache = new Cache();

const fakeTimeout = 1000;

const userList = [
  { username: 'nader12334', firstName: 'nader', lastName: 'almogazy', age: 27 },
  { username: 'leocrossman', firstName: 'leo', lastName: 'crossman', age: 23 },
  { username: 'ep1815', firstName: 'evan', lastName: 'preedy', age: 23 },
  { username: 'stebed', firstName: 'steven', lastName: 'du', age: 26 },
];
const getUser = (username) => {
  for (const user of userList) {
    if (user.username === username) return user;
  }
  return null;
};
const fakeDBLookup = (fail) =>
  new Promise((resolve, reject) => {
    setTimeout((fail) => {
      // if (fail) reject('failed');
      resolve('Hello World');
    }, fakeTimeout);
  });

const fakeWeatherLookup = (fail) =>
  new Promise((resolve, reject) => {
    setTimeout((fail) => {
      // if (fail) reject('failed');
      resolve(
        JSON.stringify({
          temperature: 48,
          windspeed: 9,
          summary: 'Mostly sunny',
          stats: {
            precipitation: 1,
            humidity: 41,
          },
        })
      );
    }, fakeTimeout);
  });
const fakeGetAllUsers = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // if (err) reject('failed');
      resolve(JSON.stringify(userList));
    }, 2000);
  });
const fakeGetUser = (username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(getUser(username)));
    }, 2000);
  });
};
const fakeSevenDayLookup = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(JSON.stringify([41, 25, 30, 10, 2, 20, 30]));
    }, fakeTimeout);
  });

const schema = buildSchema(`
  type Stats {
    precipitation: Int
    humidity: Int
  }

  type User {
    username: String
    firstName: String
    lastName: String
    age: Int
  }
  input UserInput {
    username: String
    firstName: String
    lastName: String
    age: Int
  }

  type Weather {
    temperature: Int
    windspeed: Int
    summary: String
    stats: Stats
  }

  type Query {
    hello: String
    sevenDayTemp: [Int]
    weather: Weather
    getAllUsers: [User]
    getUserByUsername(username: String): User
  }
  type Mutation {
    createUser(user: UserInput): User
  }
`);

const rootValue = {
  //STRING TEST
  hello: async (parent, args, info) => {
    const t1 = Date.now();

    const cachedResponse = cache.check(info);
    if (cachedResponse) {
      console.log(`This call took ${Date.now() - t1}ms, coming from cache`);
      return cachedResponse;
    }

    //some database lookup
    const normalResponse = await fakeDBLookup();

    cache.store(info, normalResponse);
    console.log(`This call took ${Date.now() - t1}ms, coming from database`);
    return normalResponse;
  },
  // ARRAY TEST
  sevenDayTemp: async (parent, args, info) => {
    const t1 = Date.now();

    const cachedResponse = cache.check(info);
    console.log(cache.content);
    if (cachedResponse) {
      console.log(`This call took ${Date.now() - t1}ms, coming from cache`);
      return cachedResponse;
    }

    //some database lookup

    const normalResponse = await fakeSevenDayLookup();
    const parsedResponse = JSON.parse(normalResponse);
    cache.store(info, parsedResponse);
    console.log(`This call took ${Date.now() - t1}ms, coming from database`);
    return parsedResponse;
  },
  //OBJECT TEST
  weather: async (parent, args, info) => {
    const t1 = Date.now();

    const cachedResponse = cache.check(info);
    if (cachedResponse) {
      console.log(cachedResponse);
      console.log(`This call took ${Date.now() - t1}ms, coming from cache`);
      return cachedResponse;
    }
    //some database lookup
    const jsonResponse = await fakeWeatherLookup();
    const normalResponse = JSON.parse(jsonResponse);

    cache.store(info, normalResponse);
    console.log(`This call took ${Date.now() - t1}ms, coming from database`);
    return normalResponse;
  },
  getAllUsers: async (parent, args, info) => {
    const t1 = Date.now();

    const cachedResponse = cache.listPull('allUsers');

    if (cachedResponse) {
      console.log(`This call took ${Date.now() - t1}ms, coming from cache`);
      return cachedResponse;
    }
    //some database lookup
    const jsonResponse = await fakeGetAllUsers();
    const normalResponse = JSON.parse(jsonResponse);

    cache.listPush('allUsers', ...normalResponse);
    console.log(`This call took ${Date.now() - t1}ms, coming from database`);
    return normalResponse;
  },
  getUserByUsername: async (args, parent, info) => {
    const t1 = Date.now();
    const { username } = args;

    const cachedResponse = cache.listFetch('users', 'username', username); // list key, target/filter key, target value
    if (cachedResponse) {
      console.log(`This call took ${Date.now() - t1}ms, coming from cache`);
      return cachedResponse[0];
    }
    //some database lookup
    const jsonResponse = await fakeGetUser(username);
    const normalResponse = JSON.parse(jsonResponse);

    cache.listPush('users', normalResponse);
    console.log(`This call took ${Date.now() - t1}ms, coming from database`);
    return normalResponse;
  },
  // createUser: async (args, parent, info) => {
  //   const t1 = Date.now();
  //   const {username} = args

  //   const cachedResponse = cache.listFetch("users", "username", username)
  //   if (cachedResponse) {
  //     console.log(`This call took ${Date.now() - t1}ms, coming from cache`);
  //     return cachedResponse[0];
  //   }
  //   //some database lookup
  //   const jsonResponse = await fakeGetUser("nader12334");
  //   const normalResponse = JSON.parse(jsonResponse);

  //   cache.listPush("users", normalResponse);
  //   console.log(`This call took ${Date.now() - t1}ms, coming from database`);
  //   return normalResponse;
  // },
};

module.exports = { rootValue, schema };
