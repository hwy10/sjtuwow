var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var settings = require('./settings');

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
app.use(settings.STATIC_URL, express.static(settings.STATIC_ROOT));
app.use(session({
  secret: settings.SECRET_KEY,
  name: settings.SESSION_NAME,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: settings.COOKIE_TIMEOUT }
}));

// TODO
// Wait to be recoded for BattleNetAPI @GanZhenye
//
// app.use(function (req, res, next) {
//   var url = req.originalUrl;
//   if (req.session.user) {
//     var connection = require('./database/db');
//     connection.query('SELECT * FROM user WHERE id=?', [req.session.user.id], function (err, rows, fields) {
//       if (!err) {
//         req.session.user = {
//           username: rows[0].username,
//           name: rows[0].name,
//           email: rows[0].email,
//           id: rows[0].id
//         }
//       }
//     });
//     res.locals.user = req.session.user
//   } else if (!url.startsWith('/users/login') && !url.startsWith('/users/register') && !url.startsWith('/static/')) {
//     return res.redirect('/users/login')
//   }
//   next()
// });

var routes = require('./routes/index');
app.use('/', routes);
var users = require('./routes/users');
app.use('/users', users);

/*
 * Catch 404 and forward to error handler
 * TODO
 * This is something wrong since this will make epilogue failed!. From HuangYichao.
 */
// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

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
