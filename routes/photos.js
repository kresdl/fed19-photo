'use strict';

const router = require('express').Router(),
  { photos, photo, newPhoto, deletePhoto } = require('../controllers/photos');

router.get('/', photos);
router.post('/', newPhoto);
router.delete('/:photoId', deletePhoto);
router.get('/:photoId', photo);

module.exports = router;
