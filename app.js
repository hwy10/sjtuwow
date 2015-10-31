/*jslint unparam: true*/
/*jslint todo: true*/

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

var passport = require('passport');

var settings = require('./settings');
var error = require('./errors');

var SequelizeStore = require('connect-session-sequelize')(session.Store);

var app = express();

/*
 * Configure middlewares.
 */
app.set('views', settings.VIEW_ROOT);
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
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

app.use(function (req, res, next) {
  var url = req.originalUrl;
  if (!(url.startsWith(settings.STATIC_URL) || url.startsWith('/auth'))) {
    var isLogin = require('./routes/auth').isLogin;
    if (!isLogin(req)) {
      if (url.startsWith(settings.API_URL)) {
        throw new error.AuthError('Auth Failed.');
      }
      return res.redirect('/auth/login');
    }
  }
  next();
});

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));


// Api Error Handler
app.use(error.error_handler);

module.exports = app;

/*
 * Just to init them.
 */
require('./resources');
