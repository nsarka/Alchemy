// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'postgres://localhost/postgres',
      user:     'postgres',
      password: 'op123'
    },

    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
