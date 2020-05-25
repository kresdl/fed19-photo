'use strict';

module.exports = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Expose-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') 
    return res.sendStatus(200);

  next();
};