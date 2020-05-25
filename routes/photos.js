'use strict';

const router = require('express').Router(),
  { photos, photoId } = require('../controllers/photos');

router.get('/', photos);
router.get('/:id', photoId);

module.exports = router;
