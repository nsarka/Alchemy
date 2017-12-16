'use strict'

var express = require('express');
var router = express.Router();

// Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

// Define the base api route (www.csoptic.com/api/)
router.get('/', function(req, res) {
	res.send('www.csoptic.com/api/');
});

// Define the about route (www.csoptic.com/api/about) for testing
router.get('/about', function(req, res) {
	res.send('www.csoptic.com/api/about');
});

module.exports = router;