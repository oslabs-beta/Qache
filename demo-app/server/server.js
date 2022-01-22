const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));

mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB!');
});

const productController = require('./controllers/productController');

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
