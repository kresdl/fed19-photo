'use strict';

require('dotenv').config();
const app = require('express')(),
  bodyParser = require('body-parser'),
  { cors, jwt, response } = require('./controllers/middleware'),
  users = require('./routes/users'),
  albums = require('./routes/albums'),
  photos = require('./routes/photos'),
  port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(cors, bodyParser.json(), response);
app.use('/', users, jwt);
app.use('/albums', albums);
app.use('/photos', photos);
app.use('/', (req, res) => res.fail());

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}...`);
});