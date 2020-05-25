'use strict';

const router = require('express').Router(),
  { register, login } = require('../controllers/account');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
