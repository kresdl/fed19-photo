'use strict';

const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body,
      user = await User.register({ first_name, last_name, email, password });

    if (!user) {
      res.status(403).json({
        status: 'fail',
        data: 'Unable to create user'
      });  

    } else {
      res.status(201).json({
        status: 'success',
        data: 'Created new user'
      });  
    }

  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'Internal error'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body,
      user = await User.login({ email, password });

    if (user) {
      res.json({
        status: 'success',
        data: jwt.sign({ id: user.id }, process.env.JWT_SECRET)
      });

    } else {      
      res.status(403).json({
        status: 'fail',
        data: 'Email/password mismatch'
      });
    }

  } catch (err) {
    console.log(err);
    
    res.status(500).json({
      status: 'error',
      message: 'Internal error'
    });
  }
};