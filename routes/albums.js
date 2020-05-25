'use strict';

const router = require('express').Router(),
  { albums, albumId } = require('../controllers/albums');

router.get('/', albums);
router.get('/:id', albumId);

module.exports = router;
