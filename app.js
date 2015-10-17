var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'a website for sjtuwower',
  name: 'sjtuwow',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
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
app.use('/', routes);
app.use('/users', users);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err)
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  })
});
module.exports = app
