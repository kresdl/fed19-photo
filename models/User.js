'use strict';

const bookshelf = require('../bookshelf'),
  bcrypt = require('bcrypt');

module.exports = bookshelf.model('User', {
  tableName: 'users',

  albums() {
    return this.hasMany('Album');
  },

  photos() {
    return this.hasMany('Photo');
  }
}, {

  byId(id) {
    return this
      .forge({ id })
      .fetch({ 
        withRelated: ['albums', 'photos'], 
        require: false 
      });
  },

  async register({ firstName, lastName, email, password, }) {
    const hashed = await bcrypt.hash(password, 10);

    return this
      .forge({
        first_name: firstName, 
        last_name: lastName, 
        email,
        password: hashed
      })
      .save();
  },

  async login({ email, password }) {
    const user = await this
      .forge({ email })
      .fetch({ require: false });
      
    if (user.id) {
      const pass = await bcrypt.compare(password, user.get('password'));
      if (pass) return user;
    }
    return null;
  }
});
