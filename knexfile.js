var config = require('./config');

module.exports = {

  development: {
    client: 'postgresql',
    connection: config.dbLink,

    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: config.dbLink,

    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
