/*jslint unparam: true*/
/*jslint todo: true*/

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

var passport = require('passport');

var settings = require('./settings');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var app = express();

/*
 * Configure middlewares.
 */
app.set('views', settings.VIEW_ROOT);
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); app.use(cookieParser());
app.use(methodOverride());

// init db
var db = require('./models').db;

app.use(session({
  secret: settings.SECRET_KEY,
  name: settings.SESSION_NAME,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: settings.COOKIE_TIMEOUT },
  store: new SequelizeStore({
    checkExpirationInterval: settings.SESSION_CHECK_EXPIRE_INTERVAL,
    expiration: settings.SESSION_TIMEOUT,
    db: db
  }),
}));

app.use(settings.STATIC_URL, express.static(settings.STATIC_ROOT));

// init bn agent
app.use(passport.initialize()); 

app.use(function (req, res, callback) {
  var url = req.originalUrl;
  if (url.startsWith(settings.STATIC_URL) || url.startsWith('/auth')) {
    callback();
  } else {
    // Page Auth
    var isLogin = require('./routes/auth').isLogin;
    if (!isLogin(req)) {
      return res.redirect('/auth/login');
    }
    callback();
  }
});

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));

/*
 * error handlers
 * development error handler
 *  will print stacktrace
 */
if (app.get('env') === 'development') {
  app.use(function (err, req, res, callback) {
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
app.use(function (err, req, res, callback) {
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
