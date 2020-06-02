'use strict';

const router = require('express').Router(),
  { register, login } = require('../controllers/users'),
  { firstName, lastName, email, password, validate } = require('../controllers/middleware').validators;

router.post('/register',
  firstName, lastName, email, password, validate, register
);

router.post('/login',
  email, password, validate, login
);

module.exports = router;
