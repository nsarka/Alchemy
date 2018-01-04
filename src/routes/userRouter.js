'use strict'

var express = require('express');
var router = express.Router();

var db = require('../db/knex.js');

// Middleware that is specific to this router
router.use('/', function timeLog(req, res, next) {
	console.log('[*] User Router accessed at time: ', Date.now());
	next();
});

// csoptic.com/user/
router.route('/')

	/*
		Defines the GET user route (GET www.csoptic.com/user)
		------------------------------------------------------------------------
		Authentication: User logged in
		Returns: (tentative) Json object of all of the user's info
	*/
	.get(function(req, res) {
		// TODO: Query database for this specific steamID and return data
		res.json({ tradeLink: 'test', email: 'testemail@email.com', name: 'Rick James' });
	})

	/*
		Defines the POST user route (POST www.csoptic.com/user)
		------------------------------------------------------------------------
		Authentication: User logged in
		Creates or updates user profile in DB
		Returns: Success or error message
	*/
	.post(function(req, res) {
		res.json({ message: 'POST www.csoptic.com/user : Creates or updates user profile in the database' });
	})


module.exports = router;