'use strict';

const bookshelf = require('../bookshelf'),
  Album = require('../models/Album');

module.exports = bookshelf.model('Photo', {
  tableName: 'photos',

  albums() {
    return this.belongsToMany('Album', 'album_photo');
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
        withRelated: ['albums'], 
        require: false 
      });
  },

  byUser(userId) {
    return this.forge()
      .where({ user_id: userId })
      .fetchAll({ 
        withRelated: ['albums'], 
        require: false 
      });
  },

  create({ userId, title, url, comment }) {
    return this.forge({ 
      user_id: userId,
      title, url, comment
    })
      .save();
  },
  
  async destroy(userId, id) {
    const photo = await this.forge()
      .where({ 
        user_id: userId, 
        id 
      })
      .fetch({ require: false });
    
    if (!photo) return false;

    photo.destroy();
    return true;
  }
});

