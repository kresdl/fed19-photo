'use strict';

const jwt = require('jsonwebtoken'),
  { validationResult } = require('express-validator'),
  User = require('../models/User');

module.exports = {

  cors(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', '*, Authorization');
    res.set('Access-Control-Expose-Headers', '*, Authorization');

    if (req.method === 'OPTIONS')
      return res.sendStatus(200);

    next();
  },

  async jwt(req, res, next) {
    const auth = req.get('Authorization');

    if (auth) {
      const token = auth.split(' ')[1];

      if (token) {
        try {
          const id = jwt.verify(token, process.env.JWT_SECRET).user,
            user = await User.byId(id);

          if (user) {
            res.locals.user = id;
            return next();

          } else {
            return res.fail(403, 'Token valid but unable find user in database');
          }

        } catch (err) {
          console.log(err);
          return res.fail(403, 'Invalid token');
        }
      }
    }
    res.fail(403, 'Access denied');
  },

  // Assign customized response methods to conform to JSend-specification

  response(_, res, next) {
    res.success = (status = 200, data = 'Operation succeeded') => {
      res.status(status).json({
        status: 'success',
        data
      });
    };

    res.fail = (status = 400, data = 'Operation failed') => {
      res.status(status).json({
        status: 'fail',
        data
      });
    };

    res.error = (status = 500, message = 'Internal error') => {
      res.status(status).json({
        status: 'error',
        message
      })
    };

    next();
  },

  // Catch Express-validator errors
  
  validate(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    res.fail(422, errors.array());
  }
};
