'use strict';

const router = require('express').Router(),
  { albums, album, newAlbum, deleteAlbum } = require('../controllers/albums');

router.get('/', albums);
router.post('/', newAlbum);
router.delete('/:albumId', deleteAlbum);
router.get('/:albumId', album);

module.exports = router;
