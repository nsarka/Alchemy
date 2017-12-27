/*
        ___    __     __                        
       /   |  / /____/ /_  ___  ____ ___  __  __
      / /| | / / ___/ __ \/ _ \/ __ `__ \/ / / /
     / ___ |/ / /__/ / / /  __/ / / / / / /_/ / 
    /_/  |_/_/\___/_/ /_/\___/_/ /_/ /_/\__, /  
                                       /____/   
    
    www.CsOptic.com
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

// Everything else
var express = require('express');
var hbs = require('express-handlebars');
var session = require('express-session');
var server = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var knex = require('./src/db/knex');
var passport = require('passport');
var steamStrategy = require('passport-steam').Strategy;

// Routers in separate files
var indexRouter = require('./src/routes/indexRouter');
var coinflipsRouter = require('./src/routes/coinflipsRouter');
var userRouter = require('./src/routes/userRouter');

// Server settings grabbed from config
var port = process.env.PORT || config.productionMode ? config.portProductionMode : config.portDevelMode;

// Set up Handlebars
server.set('views', path.join(__dirname + '/src/views'));
server.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/src/views/layouts'}));
server.set('view engine', 'hbs');

// Register body-parser, morgan, and other middleware
if(config.productionMode) {
    server.use(helmet());
}
server.use(morgan(config.productionMode ? 'short' : 'dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Passport serialize to make sure session doesn't end across pages (if I understand this correctly)
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// Set up Passport for authentication
passport.use(new steamStrategy(config.steamStrategyInfo,
    function(identifier, profile, done) {
        process.nextTick(function () {
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
));

// Passport's middleware
server.use(session(config.sessionInfo));
server.use(passport.initialize());
server.use(passport.session());

// Set server to use routes
server.use('/api/coinflips', coinflipsRouter);
server.use('/user', userRouter);
server.use('/', indexRouter);

// Public directory for site resources, e.g. style.css
server.use(express.static(__dirname + '/public'));

// Create http(s) server & run
if(config.productionMode) {
    httpHandler.createServer(config.sslOptions, server).listen(port, function() {
        console.log('[*] Server Started in Production Mode On Port %d', port);
    });
} else {
    httpHandler.createServer(server).listen(port, function() {
        console.log('[*] Server Started in Development Mode On Port %d', port);
    });
}