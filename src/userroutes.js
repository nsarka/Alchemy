'use strict'

var express = require('express');
var router = express.Router();

// Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('[!] Userroutes accessed at time: ', Date.now());
	next();
});

router.route('/user')

	/*
		Defines the GET user route (GET www.csoptic.com/user)
		------------------------------------------------------------------------
		Authentication: User logged in
		Returns: (tentative) Json object of all of the user's info
	*/
	.get(function(req, res) {
		res.json({ message: 'GET www.csoptic.com/user : Gets all of your user info' });
	})

	/*
		Defines the POST user route (POST www.csoptic.com/user)
		------------------------------------------------------------------------
		Authentication: User logged in
		Creates: New user profile
		Returns: Success or error message
	*/
	.post(function(req, res) {
		res.json({ message: 'POST www.csoptic.com/api/coinflips : Creates a new user record in the database' });
	})

	/*
		Defines the PUT user route (PUT www.csoptic.com/user)
		------------------------------------------------------------------------
		Authentication: User logged in
		Updates: User info with supplied info
		Returns: Success or error message
	*/
	.put(function(req, res) {
		res.json({ message: 'POST www.csoptic.com/api/user : Updates your user info' });
	})


module.exports = router;