'use strict';

const router = require('express').Router(),
  { photos, photo, newPhoto, deletePhoto } = require('../controllers/photos'),
  { body, param } = require('express-validator'),
  { validate }= require('../controllers/middleware');

router.get('/', photos);

router.post('/', 
  body('title').notEmpty().withMessage('Must be 1 character or more'),
  body('url').isURL().withMessage('Must be an URL'),
  body('albums').optional().custom(albums => {
    if (!Array.isArray(albums)) return false;
    return albums.length && albums.every(album =>
      typeof album === 'string' && album.length
    );
  })
    .withMessage('Must be a non-empty array of non-empty strings'),
  validate, newPhoto
);

router.use('/:photoId', 
  param('photoId').custom(id => Number.isInteger(+id) && id !== '0')
    .withMessage('Must be an integer > 0'),
  validate
);

router.delete('/:photoId', deletePhoto);
router.get('/:photoId', photo);

module.exports = router;
