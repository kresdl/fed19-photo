'use strict';

const router = require('express').Router(),
  { albums, albumId } = require('../controllers/albums');

router.get('/', albums);
router.get('/:albumId', albumId);

module.exports = router;
