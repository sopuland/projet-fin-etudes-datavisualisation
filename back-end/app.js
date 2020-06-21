/* Import modules */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var package = require('../package.json');
var passport = require('./helpers');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

/* Import middlewares */
var cors = require('./middlewares/cors');

/* Import routes */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var deviceRouter = require('./routes/device');

/* Create app */
var app = express();

/* Configuration */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* CORS */
app.use(cors.handle);

/* XHR filter */
app.use((req, res, next) => {
    if(!req.xhr) {
        return res.status(405).end();
    }
    next();
});

/* Get database address */
var database = process.env.DB || 'mongodb://localhost:27017/' + package.name;

/* Connect database and listen on provided port, on all network interfaces. */
mongoose.connect(database, {useNewUrlParser: true});

mongoose.connection.on('error', () => {
  console.log("Database connection error");
});

// Sessions
app.use(
    session({
        secret: 'mydevsecretkey',
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        resave: false,
        saveUninitialized: false
    })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

/* Routes */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/device', deviceRouter);

module.exports = app;
