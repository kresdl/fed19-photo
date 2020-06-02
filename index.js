'use strict';

require('dotenv').config();
const app = require('express')(),
  port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(require('./routes/index'));

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}...`);
});