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

var BnetStrategy = require('passport-bnet').Strategy;
var passport = require('passport')
var oauth2 = require('./.vscode/oauth2.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static',express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'a website for sjtuwower',
	name:'sjtuwow',
	resave: true,
	saveUninitialized: true,
	cookie: {maxAge:7*24*60*60*1000},
}));

passport.serializeUser(function(user, done) { 
    done(null, user); 
}); 
 
passport.deserializeUser(function(obj, done) { 
    done(null, obj); 
});   

passport.use(new BnetStrategy({
    clientID: oauth2.BN_KEY,
    clientSecret: oauth2.BN_SECRET,
    scope: "wow.profile",
    region: "cn",
    callbackURL: "https://sjtuwow.azurewebsites.net/login/callback"
}, function(accessToken, refreshToken, profile, done) {
    //console.log("refresh Token = " + refreshToken);
    //console.log("access Token = " + accessToken);
    profile.accessToken = accessToken;
    var str = JSON.stringify(profile);
    //console.log(str);
    return done(null, str);
    //process.nextTick(function () { 
    //     return done(null, profile); 
    //   }); 
}));

console.log(oauth2.BN_KEY);
console.log(oauth2.BN_SECRET);

app.use(passport.initialize()); 
app.use(passport.session()); 

app.get('/login',  passport.authenticate('bnet'));
app.get('/login/callback', 
        passport.authenticate('bnet', { /*successRedirect: '/login/success',*/ failureRedirect: '/' }),
        function(req, res){ 
          req.user = JSON.parse(req.user);
          req.session.passport.user = JSON.parse(req.session.passport.user);
          //console.log(require('util').inspect(req.session));
          //console.log(require('util').inspect(req.user));
          res.send("login!\n" + req.session.passport.battletage);
        }
); 
//app.get('/login/success', function(req, res) { res.send("login!\n" ); });
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
})




app.use(function (req, res, next) {
  console.log(req.url);
  console.log(" session = " + require('util').inspect( req.session));
  console.log(" user = " + require('util').inspect( req.user));
  next();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
