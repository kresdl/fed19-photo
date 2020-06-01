'use strict';

// Model methods throw bookshelf errors sparsingly so controller 
// can distinguish between database driver errors and empty results as
// effectively as possible.

const bookshelf = require('../bookshelf'),
  User = require('./User');

module.exports = bookshelf.model('Photo', {
  tableName: 'photos',

  albums() {
    return this.belongsToMany('Album', 'album_photo');
  },

  user() {
    return this.belongsTo('User');
  }
}, {

  create({ userId, title, url, comment }) {
    return this.forge({ 
      title, url, comment,
      user_id: userId
    })
      .save();
  },
  
  async destroy(userId, id) {
    const photo = await User.photo(userId, id);
    if (!photo) return null;

    return photo.destroy();
  }
});

