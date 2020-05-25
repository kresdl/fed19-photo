'use strict';

const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body,

      user = {
        first_name, last_name, birth, email,
        password: await bcrypt.hash(password, 10)
      },

      r = await query(mysql.format('INSERT INTO users SET ?', user));

    if (r.affectedRows)
      return res.status(201).json({
        status: 'success',
        data: 'Created new user'
      });

    res.status(500).json({
      status: 'error',
      message: 'Internal error'
    });

  } catch (err) {
    console.log(err);

    if (err.errno === 1062)
      res.statusMessage = 'User already exists';

    res.status(403).json({
      status: 'fail',
      data: 'Invalid input'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body,
      sql = 'SELECT id, password FROM users WHERE email=?',
      results = await query(mysql.format(sql, email));

    if (results.length) {
      const row = results[0],
        pass = await bcrypt.compare(password, row.password);

      if (pass) {
        return res.json({
          status: 'success',
          data: jwt.sign({ id: row.id }, process.env.JWT_SECRET)
        });
      }
    }
    res.status(403).json({
      status: 'fail',
      data: 'Email/password mismatch'
    });

  } catch (err) {
    console.log(err);
    
    res.status(500).json({
      status: 'error',
      message: 'Internal error'
    });
  }
};