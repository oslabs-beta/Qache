const { buildSchema } = require("graphql");
const Cache = require('../Qachengo/Qachengo')
const cache = new Cache

const fakeDBLookup = (fail) =>
  new Promise((resolve, reject) => {
    setTimeout((fail) => {
      if(fail) reject("failed")
      resolve("Hello World");
    }, 2000);
});

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootValue = {
  hello: async() => {
    const t1 = Date.now()
    const cachedResponse = cache.check('hello')
    if(cachedResponse) return `${cachedResponse} from Qachengo in ${Date.now() - t1} ms`

    //some database lookup

    const normalResponse = await fakeDBLookup()

    cache.set('hello', normalResponse)
    return `${normalResponse} from The Database in ${Date.now() - t1} ms`
  },
};

module.exports = { rootValue, schema }
