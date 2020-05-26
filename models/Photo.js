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

  byId(id) {
    return this.forge({ id }).fetch()
  },

  byUser(userId) {
    return this.forge({ user_id: userId }).fetchAll();
  }
});

