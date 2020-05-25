'use strict';

require('dotenv').config();
const app = require('express')(),
  bodyParser = require('body-parser'),
  { env } = process,
  port = env.PORT | 3000;

app.disable('x-powered-by');
app.use('/', require('./routes/cors'));
app.use(bodyParser.json({ extended: true }));
app.use('/', require('./routes/jwt'));

app.listen(port, 'localhost', () => {
  console.log(`Listening on port ${port}...`);
});