const { buildSchema } = require('graphql');
const Cache = require('../Qachengo/Qachengo');
const gql = require('graphql-tag');

const cache = new Cache();

const fakeDBLookup = (fail) =>
  new Promise((resolve, reject) => {
    setTimeout((fail) => {
      if (fail) reject('failed');
      resolve('Hello World');
    }, 2000);
  });

const fakeWeatherLookup = (fail) =>
  new Promise((resolve, reject) => {
    setTimeout((fail) => {
      if (fail) reject('failed');
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
    }, 2000);
  });
const fakeSevenDayLookup = (fail) =>
  new Promise((resolve, reject) => {
    setTimeout((fail) => {
      if (fail) reject('failed');
      resolve(JSON.stringify([41, 25, 30, 10, 2, 20, 30]));
    }, 2000);
  });

const schema = buildSchema(`
  type Stats {
    precipitation: Int
    humidity: Int
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
    const normalResponse = await JSON.parse(jsonResponse);

    cache.store(info, normalResponse);
    console.log(`This call took ${Date.now() - t1}ms, coming from database`);
    return normalResponse;
  },
};

module.exports = { rootValue, schema };
