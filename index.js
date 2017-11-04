/**
 * Created by pandit on 02-11-2017.
 */
const express 		= require('express');
const app 			= express();
const bodyParser 	= require('body-parser');
const morgan 		= require('morgan');
const session 		= require('express-session');
const cors 			= require('cors');
const db 			= require('./config/db');
const config 		= require('./config/config');
const mongoose 		= require('mongoose');
const mongoStore 	= require('connect-mongo')(session);
const router 		= express.Router();

// =======================
// configuration =========
// =======================

// Routes
// const authentication = require('./server/auth/auth.middleware')
const patients_route	= require('./server/patient/patient.route');
const definitions_route = require('./server/definition/definition.route');
const summaries_route 	= require('./server/summary/summary.route');

// Initialize router
patients_route(router);
definitions_route(router);
summaries_route(router);


// Initialize connection to the mongo database
app.use(session({
    secret: config.secret,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    }),
    saveUninitialized: true,
    resave: false
}));


const port = process.env.PORT || 9000; // port for the application

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

// Allow cross origin requests
app.use(cors());

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use('/api/v1/', router);

app.use('/', express.static(__dirname + '/public', {redirect: false}));


// =======================
// Server ================
// =======================
// Start Server
const server = app.get('*', function (req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
}).listen(port);

console.log('Connection to http://localhost:' + port);

module.exports = app;
