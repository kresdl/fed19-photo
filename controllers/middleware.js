'use strict';

const jwt = require('jsonwebtoken'),
  { validationResult } = require('express-validator');

exports.cors = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Expose-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') 
    return res.sendStatus(200);

  next();
};

exports.jwt = (req, res, next) => {
  const auth = req.get('Authorization');

  if (auth) {
    const token = auth.split(' ')[1];

    if (token) {
      try {
        const { user } = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = user;
        return next();

      } catch (err) {
        console.log(err);
        return res.fail(403, 'Access denied');
      }
    }
  }
  return res.fail(403, 'Access denied');  
};

exports.response = (req, res, next) => {
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

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  res.fail(422, errors.array());
};
