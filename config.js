'use strict'

var fs = require('fs');

module.exports = {

	// Set to false if running on localhost, true otherwise
	productionMode: process.env.NODE_ENV == 'production' || false,

	// Ports for production and development modes
	portProductionMode: 443,
	portDevelMode: 80,

	// SteamApis.com key for item pricing api
	steamApisDotComKey: 'pCZft8PWNtnyOmST6_V-XEU8CxM',

	// Bot login info
	bots: {
		bot_1: {
			accountName: 'magn26',    						// Username
			password: '11112321q',       						// Password
			twoFactorCode: 'R+rKeqhbdgJmCdOa64JL+9LxPzU=',  		// shared_secret value
			identitySecret: 'Db5EkqUtEsmScmT8mK+D98f6po8=', 		// identity_secret value
			steamID64: '76561198159926602',  					// SteamID64 of bot account can be found here: "https://steamid.io/"
			personaName: 'CsOptic',   						// Nickname for bot account, will change on restart
		},

		bot_2: {
			accountName: 'Somebodyelse234',    				// Username
			password: 'Hal83057ndb82bs5',       				// Password
			twoFactorCode: 'FGNmmAWM2vm0LeRToX6ryrc0t8o=',  		// shared_secret value
			identitySecret: 'DCA6unoWiRdMGqL6XbRrLgjl1BE=', 		// identity_secret value
			steamID64: '76561198401956045',  					// SteamID64 of bot account can be found here: "https://steamid.io/"
			personaName: 'CsOptic Alt',   					// Nickname for bot account, will change on restart
		},
	},

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