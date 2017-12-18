'use strict'

var fs = require('fs');

module.exports = {
	
	// Set to false if running on localhost, true otherwise
	productionMode: false,

	// Ports for production and development modes
	portProductionMode: 443,
	portDevelMode: 80,

	// Link to database
	dbLink: 'mongodb://localhost/csoptic',
	dbUseAuth: false,
	dbAuth: {
		user: '',
		pass: ''
	},

	// SSL certificate
	sslOptions: {
		cert: this.productionMode ? fs.readFileSync('/etc/letsencrypt/live/www.csoptic.com/fullchain.pem') : '',
		key: this.productionMode ? fs.readFileSync('/etc/letsencrypt/live/www.csoptic.com/privkey.pem') : ''
	}
}