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
  },

  async addPhoto(userId, albumId, photoId) {
    const album = await this.forge()
      .where({ 
        user_id: userId,
        id: albumId
      })
      .fetch({ 
        withRelated: ['photos'],
        require: false 
      });

    if (album) {
      await album.photos()
        .attach(photoId);
    }

    return album;
  },

  async removePhoto(userId, albumId, photoId) {
    const album = await this.forge()
      .where({ 
        user_id: userId,
        id: albumId
      })
      .fetch();

    if (album) {
      await album.related('photos')
        .where({ 'photos.id': photoId })
        .fetchOne();

      await album.photos()
        .detach(photoId);
    }

    return album;
  }
});
