'use strict';

const bookshelf = require('../bookshelf');

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
    return this
      .forge({ 
        user_id: userId,
        id 
      })
      .fetch({ 
        withRelated: ['albums'], 
        require: false 
      });
  },

  byUser(userId) {
    return this
      .forge({ user_id: userId })
      .fetchAll({ 
        withRelated: ['albums'], 
        require: false 
      });
  },

  async create({ userId, title, url, comment, albums }) {
    const albumIds = albums.map(album => album.get('id')),

      photo = await this
        .forge({ 
          user_id: userId,
          title, url, comment
        })
        .save();

    await photo
      .albums()
      .attach(albumIds);
    
    return photo;
  },

  async destroy(userId, id) {
    const photo = await this
      .forge({ 
        user_id: userId, 
        id 
      })
      .fetch({ require: false });
    
    if (!photo) return false;
    photo.destroy();
    return true;
  }
});

