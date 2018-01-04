/*
	Handles everything to do with Steam e.g. logging in the bot, making trades, accepting trades, getting inventory
*/

'use strict'

var config			= require('../../config.js');

var fs 				= require('fs');

var SteamUser 			= require('steam-user');
var SteamCommunity 		= require('steamcommunity');
var SteamTotp 			= require('steam-totp');
var TradeOfferManager 	= require('steam-tradeoffer-manager');

var client 			= new SteamUser({ dataDirectory: null });
var community 			= new SteamCommunity();
var tom				= new TradeOfferManager(
	{ steam: client, domain: 'csoptic.com', language: 'en', community: community, cancelTime: 600000 }
);

if (fs.existsSync(`./polls/bot.json`)) {
	tom.pollData = JSON.parse(fs.readFileSync(`./polls/bot.json`))
}

client.logOn({
	accountName: config.bots.bot_1.accountName,
	password: config.bots.bot_1.password,
	twoFactorCode: SteamTotp.generateAuthCode(config.bots.bot_1.twoFactorCode)
});

setInterval(function() {
	console.log('[*] Reloading bot session');
	client.webLogOn();
}, 3600000);

// Automatically emitted on logon (and in response to webLogOn calls)
client.on('webSession', function(sessionID, cookies) {
	tom.setCookies(cookies, function(err) {
		if (err) {
			return callback(err);
		}
		return true;
	});
	community.setCookies(cookies);
	client.setPersona(SteamUser.Steam.EPersonaState.LookingToTrade, config.bots.bot_1.personaName);
});

tom.on('pollData', function(data) {
	fs.writeFile(`./polls/bot.json`, JSON.stringify(data));
})

// If the bot's community session expires, relog in
client.on('sessionExpired', function(err) {
	console.log('[!] The Bot\'s session has expired: ', + err + '\n[!] Relogging in');
	client.webLogOn();
});


// Public members
var bot = {

};


module.exports = bot;