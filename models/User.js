'use strict';

// Model methods throw bookshelf errors sparsingly so controller 
// can distinguish between database driver errors and empty results as
// effectively as possible.

const bookshelf = require('../bookshelf'),
  bcrypt = require('bcrypt');

module.exports = bookshelf.model('User', {
  tableName: 'users',

  albums() {
    return this.hasMany('Album');
  },

  photos() {
    return this.hasMany('Photo');
  },
  
}, {

  byId(id, ...related) {
    return this.forge()
      .where({ id })
      .fetch({ withRelated: related });
  },

  async photos(userId) {
    const user = await this.byId(userId, 'photos');
    return user.related('photos');
  },

  async photo(userId, id) {
    const user = await this.byId(userId);

    return user.photos()
      .where({ id })
      .fetchOne({ 
        require: false
      });
  },

  async albums(userId) {
    const user = await this.byId(userId, 'albums');
    return user.related('albums');
  },

  async album(userId, id) {
    const user = await this.byId(userId);

    return user.albums()
      .where({ id })
      .fetchOne({ 
        withRelated: ['photos'],
        require: false
      });
  },

  async register({ firstName, lastName, email, password }) {
    const hashed = await bcrypt.hash(password, 10);

    return this.forge({
      first_name: firstName, 
      last_name: lastName, 
      email,
      password: hashed
    })
      .save();
  },

  async login({ email, password }) {
    const user = await this.forge()
      .where({ email })
      .fetch({ require: false });

    if (user) {
      const pass = await bcrypt.compare(password, user.get('password'));
      if (pass) return user;
    }
    return null;
  }
});
