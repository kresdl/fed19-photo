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

  async create({ userId, title, url, comment, albums }) {
    const photo = await this.forge({ 
      user_id: userId,
      title, url, comment
    })
      .save();

    if (albums) {
      const rel = await Album.byNames(userId, albums),
        ids = rel.map(album => album.id);
      await photo.albums().attach(ids);  
    }
    return photo;
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

