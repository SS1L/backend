const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: '../.env' });
const port = process.env.PORT;
const userAuth = require('./routes/auth.routes');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/api', userAuth);

    app.listen(port, () => {
      console.log('Server has started!');
    });
  });
