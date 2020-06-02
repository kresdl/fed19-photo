const router = require('express').Router(),
  bodyParser = require('body-parser'),
  { cors, jwt, response } = require('../controllers/middleware'),
  users = require('./users'),
  albums = require('./albums'),
  photos = require('./photos');

router.use('/', cors, bodyParser.json(), response);
router.use('/', users);
router.use('/albums', jwt, albums);
router.use('/photos', jwt, photos);
router.use('/', (_, res) => res.fail(409, 'Unsupported operation'));

module.exports = router;