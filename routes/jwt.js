'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.get('Authorization').split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    res.locals.user = user;
    next();
  })
};

//  return res.json(jwt.sign({ id }, env.JWT_SECRET));
