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
app.use('/', users);
app.use('/albums', jwt, albums);
app.use('/photos', jwt, photos);
app.use('/', (_, res) => res.fail(409, 'Unsupported operation'));

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}...`);
});