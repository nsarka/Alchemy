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
	res.render('index', {
		title: 'Home',
		msg: 'Hello Handlebars'
	});
})

router.get('/terms-of-service', function(req, res) {
	res.render('tos');
})

router.get('/faq', function(req, res) {
	res.render('faq');
})

router.get('/provably-fair', function(req, res) {
	res.render('provably');
})

router.get('/support', function(req, res) {
	res.render('support');
})


module.exports = router;