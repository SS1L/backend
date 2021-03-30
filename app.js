const { Router } = require('express');
const dotenv = require('dotenv');
// const db = require('./config/db');
dotenv.config();
let express = require('express');
let bodyParser = require('body-parser');
let port = process.env.PORT;
let cors = require('cors');
let routes = require('./routes/index');
let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Start up ${port}`);
})