'use strict';

const router = require('express').Router(),
  { photos, photo, newPhoto, deletePhoto } = require('../controllers/photos'),
  { title, url, validate } = require('../controllers/middleware').validators;

router.get('/', photos);

router.post('/', 
  title, url, validate, newPhoto
);

router.delete('/:photoId', deletePhoto);
router.get('/:photoId', photo);

module.exports = router;
