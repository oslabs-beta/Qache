const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./typeDefs/schema');
const resolvers = require('./resolvers/resolvers');

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  `mongodb+srv://sdu1278:${process.env.PASSWORD}@cluster0.vubqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'qachengo' }
);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB!');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
  const cors = require('cors');
  app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to Demo App dev server!');
  });
} else if (process.env.NODE_ENV === 'production') {
  // app.use('/dist', express.static(path.join(__dirname, '../dist')));
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

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

app.listen(process.env.PORT || port, (req, res) =>
  console.log(`Server is listening on port ${process.env.PORT || port}!`)
);
