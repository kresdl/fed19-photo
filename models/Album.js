'use strict';

// Model methods throw bookshelf errors sparsingly so controller 
// can distinguish between database driver errors and empty results as
// effectively as possible.

const bookshelf = require('../bookshelf'),
  User = require('./User');

module.exports = bookshelf.model('Album', {
  tableName: 'albums',

  photos() {
    return this.belongsToMany('Photo', 'album_photo');
  },

  user() {
    return this.belongsTo('User');
  }
}, {

  create(userId, title) {
    return this.forge({ 
      title,
      user_id: userId
    })
      .save();
  },

  async destroy(userId, id) {
    const album = await User.album(userId, id);
    if (!album) return null;

    return album.destroy();
  },
      
  async addPhoto(userId, albumId, photoId) {
    const album = await User.album(userId, albumId);
    if (!album) return null;

    await album.related('photos')
      .attach(photoId);
    
    return album;
  },

  async removePhoto(userId, albumId, photoId) {
    const album = await User.album(userId, albumId);
    if (!album) return null;

    const photos = album.related('photos');
    if (!photos.get(photoId)) throw Error('ENOENT');

    photos.detach(photoId);
    return album;
  }
});
