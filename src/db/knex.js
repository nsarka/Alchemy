// Thank you CJ Reynolds

var config = require('../../config');
var env = config.productionMode ? 'production' : 'development';
var knexconfig = require('../../knexfile')[env];

module.exports = require('knex')(knexconfig);