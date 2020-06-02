'use strict';

const router = require('express').Router(),
  { albums, album, newAlbum, deleteAlbum, addPhoto, addMany, removePhoto } = require('../controllers/albums'),
  { title, validate } = require('../controllers/middleware').validators;

router.get('/', albums);

router.post('/', 
  title, validate, newAlbum
);

router.get('/:albumId', album);
router.delete('/:albumId', deleteAlbum);
router.post('/:albumId', addMany);
router.put('/:albumId/:photoId', addPhoto);
router.delete('/:albumId/:photoId', removePhoto);

module.exports = router;
