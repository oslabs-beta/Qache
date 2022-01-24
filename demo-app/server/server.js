const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');

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

mongoose.connect('mongodb+srv://sdu1278:zTsku1BXZh8M6yRv@cluster0.vubqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB!');
});

// sending to routers upon request
app.use('/products', productsRouter);
app.use('/rooms', roomsRouter);
app.use('/deals', dealsRouter);

const productController = require('./controllers/productController');
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

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
