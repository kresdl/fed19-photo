'use strict';

require('dotenv').config();
const app = require('express')(),
  bodyParser = require('body-parser'),
  { cors, jwt } = require('./routes/middleware'),
  account = require('./routes/account'),
  albums = require('./routes/albums'),
  photos = require('./routes/photos'),
  { env } = process,
  port = env.PORT | 3000;

app.disable('x-powered-by');
app.use('/', cors);
app.use(bodyParser.json({ extended: true }));
app.use('/', account);
app.use('/', jwt);
app.use('/albums', albums);
app.use('/photos', photos);

app.listen(port, 'localhost', () => {
  console.log(`Listening on port ${port}...`);
});