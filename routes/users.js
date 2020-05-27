'use strict';

const router = require('express').Router(),
  { register, login } = require('../controllers/users'),
  { body } = require('express-validator'),
  { validate }= require('../controllers/middleware'),

  oneOrMore = 'Must be 1 character or more',
  fiveOrMore = 'Must be 5 characters or more',
  beEmail = 'Must be 1 character or more';

router.post('/register',
  body('first_name').notEmpty().withMessage(oneOrMore),
  body('last_name').notEmpty().withMessage(oneOrMore),
  body('email').isEmail().withMessage(beEmail),
  body('password').isLength({ min: 5 }).withMessage(fiveOrMore),
  validate, register
);

router.post('/login',
  body('email').isEmail().withMessage(beEmail),
  body('password').isLength({ min: 5 }).withMessage(fiveOrMore),
  validate, login
);

module.exports = router;
