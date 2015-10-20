/*
 * Authentication module
 * To navigate the user to BN login page:
 *    1. navigate to url '/auth/login'.
 *    2. user login battlenet
 *    3. redirect to '/auth/login/callback', finish session processing
 *    4. redirect to '/'
 * 
 * To nabigate the user to logout:
 *    1. navigate to url 'auth/logout'.
 *    2. finish session processing
 *    3. redirect to '/'
 * 
 * After user logged in, user profile is stored both in *req.session.passport.user* 
 * and *req.user*, and contains three fields: id, battletag, accessToken. 
 *
 * TODO: is there some way to notice BN that user has logged out in '/auth/login'?
 * 
 */

var express = require('express');
var router = express.Router();

var BnetStrategy = require('passport-bnet').Strategy;
var passport = require('passport')
var oauth2 = require('../.vscode/oauth2.js');

console.log(oauth2.BN_KEY);
console.log(oauth2.BN_SECRET);

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
    callbackURL: "https://sjtuwow.azurewebsites.net/auth/login/callback"
}, function(accessToken, refreshToken, profile, done) {
    //console.log("refresh Token = " + refreshToken);
    //console.log("access Token = " + accessToken);
    profile.accessToken = accessToken;
    var str = JSON.stringify(profile);
    return done(null, str);
}));

router.get('/login',  passport.authenticate('bnet'));
router.get('/login/callback', 
        passport.authenticate('bnet', {  failureRedirect: '/' }),
        function(req, res){ 
          req.user = JSON.parse(req.user);
          req.session.passport.user = JSON.parse(req.session.passport.user);
          //console.log(require('util').inspect(req.session));
          //console.log(require('util').inspect(req.user));
          res.redirect('/');
        }
); 
//router.get('/login/success', function(req, res) { res.send("login!\n" ); });
router.get('/logout', function(req, res){
  req.logout();
  //TODO: is there some way to notice BN that user has logged out?
  res.redirect('/');
});

module.exports = router;
