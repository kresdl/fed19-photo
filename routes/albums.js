'use strict';

const router = require('express').Router(),
  { albums, album, newAlbum, deleteAlbum } = require('../controllers/albums'),
  { body, param } = require('express-validator'),
  { validate }= require('../controllers/middleware');

router.get('/', albums);

router.post('/', 
  body('title').notEmpty().withMessage('Must be 1 character or more'),
  validate, newAlbum
);

router.use('/:albumId', 
  param('albumId').custom(id => Number.isInteger(+id) && +id > 0)
    .withMessage('Must be an integer > 0'),
  validate
);

router.delete('/:albumId', deleteAlbum);
router.get('/:albumId', album);

module.exports = router;
