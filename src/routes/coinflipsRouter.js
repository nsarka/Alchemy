'use strict'

var express = require('express');
var router = express.Router();
var coinflipGame = require('../games/coinflip.js');

// Middleware that is specific to this router
router.use('/', function timeLog(req, res, next) {
	console.log('[*] Coinflips Router accessed at time: ', Date.now());
	next();
});

// csoptic.com/api/coinflips/
router.route('/')

	/*
		Defines the GET coinflips api route (GET www.csoptic.com/api/coinflips)
		------------------------------------------------------------------------
		Authentication: none
		Returns: (tentative) json object of all of the active coinflips
	*/
	.get(function(req, res) {
		res.json(coinflipGame.getFlips());
	})

	/*
		Defines the POST coinflip api route (POST www.csoptic.com/api/coinflips)
		------------------------------------------------------------------------
		Creates: New coinflip
		Authentication: User level. Need to be logged in with Steam to use this route
		Returns: (tentative) id of created coinflip
	*/
	.post(function(req, res) {
		var id = coinflipGame.createFlip('test', 100.0);
		res.json({
			message: 'Created a new coinflip!',
			id: id
		});
	});

// csoptic.com/api/coinflips/123456
router.route('/:coinflip_id')

	/*
		Defines the GET coinflips api route (GET www.csoptic.com/api/coinflips/coinflip_id)
		------------------------------------------------------------------------
		Authentication: None
		Returns: (tentative) Json object with the details of the coinflip
	*/
	.get(function(req, res) {
		var flip = coinflipGame.getFlip(req.params.coinflip_id);

		if(flip != -1) {
			res.json(flip);
		} else {
			res.json({
				err: 'That flip # does not exist'
			});
		}
	})

	/*
		Defines the PUT coinflips api route (PUT www.csoptic.com/api/coinflips/coinflip_id)
		------------------------------------------------------------------------
		Authentication: User level. To use, coinflip_id must be the user's coinflip, else return "not allowed"
		Updates: coinflip_id with passed in info
		Returns: Success or failure message
	*/
	.put(function(req, res) {
		res.json({});
	})

	/*
		Defines the DELETE coinflips api route (DELETE www.csoptic.com/api/coinflips/coinflip_id)
		------------------------------------------------------------------------
		Authentication: User level. To use, coinflip_id must be the user's coinflip, else return "not allowed"
		Deletes: Coinflip #coinflip_id if it exists
		Returns: Success or failure message
	*/
	.delete(function(req, res) {
		res.json({ message: 'DELETE www.csoptic.com/api/coinflips/' + req.params.coinflip_id + ' : Deletes coinflip #' + req.params.coinflip_id + ' if it exists'});
	});


module.exports = router;