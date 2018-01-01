/*
	Handles everything to do with Steam e.g. logging in the bot, making trades, accepting trades, getting inventory
*/

'use strict'

var config			= require('../../config.js');

var SteamUser 			= require('steam-user');
var SteamCommunity 		= require('steamcommunity');
var SteamTotp 			= require('steam-totp');
var TradeOfferManager 	= require('steam-tradeoffer-manager');

var client 			= new SteamUser({ dataDirectory: null });
var community 			= new SteamCommunity();
var tom				= new TradeOfferManager(
	{ steam: client, domain: 'csoptic.com', language: 'en', community: community, cancelTime: 600000 }
);

var bot = {

};


module.exports = bot;