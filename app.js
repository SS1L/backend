const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT;
const authentication = require('./routes/auth.routes');

app.use(bodyParser.json());
app.use('/api', authentication);

app.listen(port, () => {
  console.log(`Start up ${port}`);
});
