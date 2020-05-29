'use strict';

const router = require('express').Router(),
  { photos, photo, newPhoto, deletePhoto } = require('../controllers/photos'),
  { body } = require('express-validator'),
  { validate }= require('../controllers/middleware');

router.get('/', photos);

router.post('/', 
  body('title').notEmpty().withMessage('Must be 1 character or more'),
  body('url').isURL().withMessage('Must be an URL'),
  validate, newPhoto
);

router.delete('/:photoId', deletePhoto);
router.get('/:photoId', photo);

module.exports = router;
