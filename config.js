'use strict'

var fs = require('fs');

module.exports = {

	// Set to false if running on localhost, true otherwise
	productionMode: process.env.NODE_ENV == 'production' || false,

	// Ports for production and development modes
	portProductionMode: 443,
	portDevelMode: 80,

	// Link to database
	dbLink: 'postgres://localhost/Nick',
	dbUseAuth: false,
	dbAuth: {
		user: '',
		pass: ''
	},

	// Info for passport-steam here to reduce clutter in index.js
	steamStrategyInfo: {
		returnURL: this.productionMode ? 'https://csoptic.com/login-return' : 'http://localhost/login-return',
		realm: this.productionMode ? 'https://csoptic.com/' : 'http://localhost/',
		apiKey: '5724FDE13EAACD6BB0CD6238E984A341'
	},

	// Express session info
	sessionInfo: {
		secret: 'dank memes',
		name: 'CsOptic',
		proxy: true,
		resave: true,
		saveUninitialized: true
	},

	// SSL certificate
	sslOptions: {
		cert: this.productionMode ? fs.readFileSync('/etc/letsencrypt/live/www.csoptic.com/fullchain.pem') : '',
		key: this.productionMode ? fs.readFileSync('/etc/letsencrypt/live/www.csoptic.com/privkey.pem') : ''
	}
}