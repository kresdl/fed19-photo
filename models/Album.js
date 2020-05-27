'use strict';

const bookshelf = require('../bookshelf');

module.exports = bookshelf.model('Album', {
  tableName: 'albums',

  photos() {
    return this.belongsToMany('Photo', 'album_photo');
  },

  user() {
    return this.belongsTo('User');
  }
}, {

  byId(userId, id) {
    return this.forge()
      .where({ 
        user_id: userId, 
        id 
      })
      .fetch({ 
        withRelated: ['photos'], 
        require: false 
      });
  },

  byUser(id) {
    return this.forge()
      .where({ user_id: id })
      .fetchAll({ require: false });
  },

  byNames(userId, names) {
    return this.forge()
      .where({ user_id: userId })
      .where('title', 'in', names)
      .fetchAll({ require: false });
  },

  create(userId, title) {
    return this.forge({ 
      user_id: userId,
      title 
    })
      .save();
  },

  async destroy(userId, id) {
    const album = await this.forge()
      .where({ 
        user_id: userId, 
        id 
      })
      .fetch({ require: false });
    
    if (!album) return false;

    album.destroy();
    return true;
  }
});
