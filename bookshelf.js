const { env } = process;

knex = require('knex')({
  client: 'mysql',
    connection: {
      database: env.DATABASE,
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASSWORD
    }
});

module.exports = require('bookshelf')(knex);