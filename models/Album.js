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

  byId(id) {
    return this.forge({ id }).fetch({ withRelated: ['photos', 'user'] });
  },

  byUser(id) {
    return this.forge({ user_id: id }).fetchAll();
  }
});
