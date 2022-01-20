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
            humidity: 41
          }
        })
      );
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
    weather: Weather
  }
`);

const rootValue = {
  hello: async (parent, args, info) => {
    console.log(info);
    const t1 = Date.now();

    const cachedResponse = cache.check('hello');
    if (cachedResponse)
      return `${cachedResponse} from Qachengo in ${Date.now() - t1} ms`;

    //some database lookup

    const normalResponse = await fakeDBLookup();
    cache.set('hello', normalResponse);

    return `${normalResponse} from The Database in ${Date.now() - t1} ms`;
  },
  weather: async (parent, args, info) => {

    const t1 = Date.now();

    const cachedResponse = cache.check(info);

    if (cachedResponse){
      console.log(`This call took ${Date.now()-t1}ms, coming from cache`)
      return cachedResponse
    }
    //some database lookup
    const jsonResponse = await fakeWeatherLookup();
    const normalResponse = await JSON.parse(jsonResponse);

    cache.set(info, normalResponse);
    console.log(`This call took ${Date.now()-t1}ms, coming from database`)
    return normalResponse;
  },
};

module.exports = { rootValue, schema };
