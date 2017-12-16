'use strict'

var express = require('express');
var router = express.Router();

// Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('[!] APIroutes accessed at time: ', Date.now());
	next();
});

router.route('/coinflips')

	/*
		Defines the GET coinflips api route (GET www.csoptic.com/api/coinflips)
		------------------------------------------------------------------------
		Authentication: none
		Returns: (tentative) json object of all of the active coinflips
	*/
	.get(function(req, res) {
		res.json({ message: 'GET www.csoptic.com/api/coinflips : Gets all active coinflips' });
	})

	/*
		Defines the POST coinflip api route (POST www.csoptic.com/api/coinflips)
		------------------------------------------------------------------------
		Creates: New coinflip
		Authentication: User level. Need to be logged in with Steam to use this route
		Returns: (tentative) id of created coinflip
	*/
	.post(function(req, res) {
		res.json({ message: 'POST www.csoptic.com/api/coinflips : Creates a coinflip' });
	})

router.route('/coinflips/:coinflip_id')

	/*
		Defines the GET coinflips api route (GET www.csoptic.com/api/coinflips/coinflip_id)
		------------------------------------------------------------------------
		Authentication: None
		Returns: (tentative) Json object with the details of the coinflip
	*/
	.get(function(req, res) {
		res.json({ message: 'GET www.csoptic.com/api/coinflips/' + req.params.coinflip_id + ' : Gets coinflip #' + req.params.coinflip_id + ' if it exists'});
	})

	/*
		Defines the PUT coinflips api route (PUT www.csoptic.com/api/coinflips/coinflip_id)
		------------------------------------------------------------------------
		Authentication: User level. To use, coinflip_id must be the user's coinflip, else return "not allowed"
		Updates: coinflip_id with passed in info
		Returns: Success or failure message
	*/
	.put(function(req, res) {
		res.json({ message: 'PUT www.csoptic.com/api/coinflips/' + req.params.coinflip_id + ' : Updates coinflip #' + req.params.coinflip_id + ' if it exists'});
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
	})

module.exports = router;