const bookshelf = require('../bookshelf'),
  bcrypt = require('bcrypt');

module.exports = bookshelf.model('User', {
  tableName: 'users',

  albums() {
    return this.hasMany('Album');
  },

  photos() {
    return this.hasMany('Photo');
  }
}, {

  byId(id) {
    return this.forge({ id })
      .fetch({ withRelated: ['albums', 'photos'] });
  },

  async register({ first_name, last_name, email, password, }) {
    const hashed = await bcrypt.hash(password, 10);

    try {
      await this
        .forge({
          first_name, last_name, email,
          password: hashed
        })
        .save();
      return true;

    } catch (err) {
      console.log(err);
      return false;
    }
  },

  async login({ email, password }) {
    const user = await this.forge({ email, password }).fetch(),
      pass = await bcrypt.compare(password, user.password);
    return pass ? user : null;
  }
});
