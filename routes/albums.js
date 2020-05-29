'use strict';

const router = require('express').Router(),
  { albums, album, newAlbum, deleteAlbum, addPhoto, removePhoto } = require('../controllers/albums'),
  { body } = require('express-validator'),
  { validate }= require('../controllers/middleware');

router.get('/', albums);

router.post('/', 
  body('title').notEmpty().withMessage('Must be 1 character or more'),
  validate, newAlbum
);

router.get('/:albumId', album);
router.delete('/:albumId', deleteAlbum);
router.put('/:albumId/:photoId', addPhoto);
router.delete('/:albumId/:photoId', removePhoto);

module.exports = router;
