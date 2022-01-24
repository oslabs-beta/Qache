const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config();

const schema = require('./typeDefs/schema');
const resolvers = require('./resolvers/resolvers');


const port = 3000;
const app = express();

const productsRouter = require('./routes/products.js');
const roomsRouter = require('./routes/rooms.js');
const dealsRouter = require('./routes/deals.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));

mongoose.connect(`mongodb+srv://sdu1278:${process.env.PASSWORD}@cluster0.vubqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'qachengo' });
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB!');
});

// sending to routers upon request
app.use('/products', productsRouter);
app.use('/rooms', roomsRouter);
app.use('/deals', dealsRouter);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

// function that sends fetch request to graphql server 
// cuts down on boilerplate
// query is the graphql query as a string (can copypaste exactly from graphiql)
// variables is an object containing the interchangable variables that can be passed into the query
async function queryFetch(query, variables) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  }).then(res => res.json());
};

// sends graphql query to fetch all products with given section (e.g. 'furniture', 'storage') in their categories
// 
app.post('/products/:section', async (req, res) => {
  const section = req.params.section;
  const data = await queryFetch(`
  `)
});

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Demo App server!');
});

app.use('*', (req, res) => {
  res.status(404).send('Page not found!');
});

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { error: 'An error occured' },
  };

  const errorObj = Object.assign(defaultError, error);
  res.status(errorObj.status).send(errorObj.message);
});

app.listen(port, (req, res) =>
  console.log(`Server is listening on port ${port}!`)
);
