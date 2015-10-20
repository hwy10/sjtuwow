var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var settings = require('./settings');

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

var app = express();

var passport = require('passport')

/*
 * Configure middlewares.
 */
app.set('views', settings.VIEW_ROOT);
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); app.use(cookieParser());
app.use(methodOverride());
app.use(settings.STATIC_URL, express.static(settings.STATIC_ROOT));
app.use(session({
  secret: settings.SECRET_KEY,
  name: settings.SESSION_NAME,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: settings.COOKIE_TIMEOUT }
}));

app.use(passport.initialize()); 
app.use(passport.session()); 

app.use(function (req, res, next) {
  console.log(req.url);
  console.log(" session = " + require('util').inspect( req.session));
  console.log(" user = " + require('util').inspect( req.user));
  next();
});

app.use('/auth', auth);
app.use('/', routes);
app.use('/users', users);

/*
 * error handlers
 * development error handler
 *  will print stacktrace
 */
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/*
 * production error handler
 * no stacktraces leaked to user
 */
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

/*
 * Just to init them.
 */
require('./resources');
require('./models');
