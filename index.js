/*
        ___    __     __                        
       /   |  / /____/ /_  ___  ____ ___  __  __
      / /| | / / ___/ __ \/ _ \/ __ `__ \/ / / /
     / ___ |/ / /__/ / / /  __/ / / / / / /_/ / 
    /_/  |_/_/\___/_/ /_/\___/_/ /_/ /_/\__, /  
                                       /____/   
    
    Codename for the CsOptic.com rewrite
*/

'use strict'

var config = require('./config');

// Modules that are only used in production
var httpHandler, helmet;

if(config.productionMode) {
    httpHandler = require('https');
    helmet = require('helmet');
} else {
    httpHandler = require('http');
}

var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

// Router in separate file
var apiroutes = require('./src/apiroutes');
var userroutes = require('./src/userroutes');

// Server setting
var port = process.env.PORT || config.productionMode ? config.portProductionMode : config.portDevelMode;

// Register body-parser, morgan, and other middleware
if(config.productionMode) {
    server.use(helmet());
}
server.use(morgan(config.productionMode ? 'short' : 'dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Configure routes
server.use('/api/', apiroutes);     // csoptic.com/api/...
server.use("/user", userroutes);    // csoptic.com/user/...

// Public directory for index.html
server.use(express.static(__dirname + '/public'));

// Create http(s) server & run
if(config.productionMode) {
    httpHandler.createServer(config.sslOptions, server).listen(port, function() {
        console.log('[!] Server Started in Production Mode On Port %d', port);
    });
} else {
    httpHandler.createServer(server).listen(port, function() {
        console.log('[!] Server Started in Development Mode On Port %d', port);
    });
}