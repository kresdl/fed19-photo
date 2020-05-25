'use strict';

const jwt = require('jsonwebtoken');

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
  const token = req.get('Authorization').split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({
      status: 'fail',
      data: 'Access denied'
    });
    res.locals.user = user;
    next();
  })
};