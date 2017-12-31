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

// Express
var express = require('express');
var app = express();

// Require http or https+helmet depending on mode
var httpOrHttps, helmet;

if(config.productionMode) {
    httpOrHttps = require('https');
    helmet = require('helmet');
} else {
    httpOrHttps = require('http');
}

// Create http(s) server & run
var server;

if(config.productionMode) {
    server = httpOrHttps.createServer(config.sslOptions, app);
} else {
    server = httpOrHttps.createServer(app);
}

// Sockets
var io = require('socket.io')(server);
var chat = require('./src/chat/chat')(io);

// Everything else
var hbs = require('express-handlebars');
var session = require('express-session')(config.sessionInfo);
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var knex = require('./src/db/knex');
var passport = require('passport');
var steamStrategy = require('passport-steam').Strategy;
var sharedSession = require('express-socket.io-session');

// Routers in separate files
var indexRouter = require('./src/routes/indexRouter');
var coinflipsRouter = require('./src/routes/coinflipsRouter');
var userRouter = require('./src/routes/userRouter');

// Server settings grabbed from config
var port = process.env.PORT || config.productionMode ? config.portProductionMode : config.portDevelMode;

// Set up Handlebars
app.set('views', path.join(__dirname + '/src/views'));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/src/views/layouts'}));
app.set('view engine', 'hbs');

// Register body-parser, morgan, and other middleware
if(config.productionMode) {
    app.use(helmet());
}
app.use(morgan(config.productionMode ? 'short' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// Give socket.io access to the session (their display name, profile picture, etc.)
io.use(sharedSession(session, {
    autoSave:true
}));

// Set server to use routes
app.use('/api/coinflips', coinflipsRouter);
app.use('/user', userRouter);
app.use('/', indexRouter);

// Public directory for site resources, e.g. style.css
app.use(express.static(__dirname + '/public'));

server.listen(port, function() {
    console.log('[*] Server Started On Port %d', port);
});