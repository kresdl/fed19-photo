'use strict';

const jwt = require('jsonwebtoken'),
  { validationResult } = require('express-validator'),
  User = require('../models/User');

exports.cors = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Expose-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') 
    return res.sendStatus(200);

  next();
};

exports.jwt = async (req, res, next) => {
  const auth = req.get('Authorization');

  if (auth) {
    const token = auth.split(' ')[1];

    if (token) {
      try {
        const id = jwt.verify(token, process.env.JWT_SECRET).user,
          user = await User.byId(id);
        
        if (user) {
          // Token verification succeeded and user was found in database
          res.locals.user = id;
          return next();

        } else {
          // Token verification succeeded but user has been deleted from database
          return res.fail(403, 'User not found');
        }

      } catch (err) {
        // Token verification failed
        console.log(err);
        return res.fail(403, 'Access denied');
      }
    }
  }
  res.fail(403, 'Access denied');  
};

// Assign customized response methods to conform to JSend-specification
exports.response = (_, res, next) => {
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
};

// Catch Express-validator errors
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  res.fail(422, errors.array());
};
