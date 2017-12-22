'use strict'

var express = require('express');
var router = express.Router();

// Middleware that is specific to this router
router.use('/', function timeLog(req, res, next) {
	console.log('[*] Index Router accessed at time: ', Date.now());
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


router.get('/coinflips', (req, res) => {
	res.render('coinflips', {
		title: 'Coinflips'
	});
})

router.get('/terms-of-service', function(req, res) {
	res.render('tos', {
		title: 'Terms Of Service'
	});
})

router.get('/faq', function(req, res) {
	res.render('faq', {
		title: 'FAQ'
	});
})

router.get('/provably-fair', function(req, res) {
	res.render('provably', {
		title: 'Provably Fair'
	});
})

router.get('/support', function(req, res) {
	res.render('support', {
		title: 'Support'
	});
})


module.exports = router;