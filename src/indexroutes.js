'use strict'

var express = require('express');
var router = express.Router();

// Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('[!] Indexroutes accessed at time: ', Date.now());
	next();
});

router.route('/')

	.get(function(req, res) {
		res.render('index', {
			title: 'Home',
			msg: 'Hello Handlebars'
		});
	})

	.post(function(req, res) {
		res.json({ message: 'You POST\'d our homepage' });
	})


module.exports = router;