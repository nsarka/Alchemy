var config = require('./config');

module.exports = {

    development: {
        client: 'pg',
        connection: config.dbLink,

        migrations: {
            directory: __dirname + '/db/migrations'
        },

        seeds: {
            directory: __dirname + '/db/seeds'
        }
    },

    production: {
        client: 'pg',
        connection: config.dbLink,

        migrations: {
            directory: __dirname + '/db/migrations'
        },

        seeds: {
            directory: __dirname + '/db/seeds'
        }
    }
};
