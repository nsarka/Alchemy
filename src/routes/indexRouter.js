'use strict'

var express 	= require('express');
var router 	= express.Router();
var passport 	= require('passport');
var db		= require('../db/knex.js');

// Middleware that is specific to this router
router.use('/', function(req, res, next) {
	next();
});

// csoptic.com/
router.route('/')

	.get(function(req, res) {
		res.redirect('/coinflips');
	})

	.post(function(req, res) {
		res.json({ message: 'You POST\'d our homepage' });
	});


// Passport login
router.get('/login', passport.authenticate('steam'));

// Passport logout
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// Passport return
router.get('/login-return',
	passport.authenticate('steam', { failureRedirect: '/login' }),
	function(req, res) {
		// Successful authentication, redirect home.
		res.redirect('/coinflips');
	}
);

// Page routes
router.get('/coinflips', (req, res) => {
	res.render('coinflips', {
		title: 'Coinflips',
		user: req.user
	});
})

router.get('/terms-of-service', function(req, res) {
	res.render('tos', {
		title: 'Terms Of Service',
		user: req.user
	});
})

router.get('/faq', function(req, res) {
	res.render('faq', {
		title: 'FAQ',
		user: req.user
	});
})

router.get('/provably-fair', function(req, res) {
	res.render('provably', {
		title: 'Provably Fair',
		user: req.user
	});
})

router.get('/support', function(req, res) {
	res.render('support', {
		title: 'Support',
		user: req.user
	});
})


module.exports = router;