'use strict';

const User = require('../models/User'),
  jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    await User.register({ 
      firstName: first_name, 
      lastName: last_name, 
      email, password 
    });

    res.success();

  } catch (err) {
    console.log(err);

    if (err.code === 'ER_DUP_ENTRY') {
      res.fail(409, 'User already exists');
    } else {
      res.error();
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body,
      user = await User.login({ email, password });

    if (user) {
      res.success(200, jwt.sign({ user: user.id }, process.env.JWT_SECRET))
    } else {      
      res.fail(403, 'Email/password mismatch');
    }

  } catch (err) {
    console.log(err);
    res.error();
  }
};