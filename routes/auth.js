/*jslint unparam: true*/
/*jslint todo: true*/

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
 * TODO
 * Is there some way to notice BN that user has logged out in '/auth/login', a solution under test
 * known problem is it can not redirect back to our site
 * 
 */

var express = require('express');
var router = express.Router();

var querystring = require('querystring');

var BnetStrategy = require('passport-bnet').Strategy;
var passport = require('passport');

var User = require('../models').User;
var Character = require('../models').Character;
var error = require('../errors');
var settings = require('../settings.js');

passport.serializeUser(function(user, done) { 
  done(null, user); 
}); 

passport.deserializeUser(function(obj, done) { 
  done(null, obj); 
});   

passport.use(new BnetStrategy({
  clientID: settings.BN_OAUTH.KEY,
  clientSecret: settings.BN_OAUTH.SECRET,
  scope: 'wow.profile',
  region: 'cn',
  callbackURL: settings.BN_CALLBACK
}, function(accessToken, refreshToken, profile, done) {
  profile.accessToken = accessToken;
  var str = JSON.stringify(profile);
  return done(null, str);
}));

router.get('/login', passport.authenticate('bnet'));
router.get('/login/callback', passport.authenticate('bnet', { failureRedirect: 'http://www.battlenet.com.cn' }),
  function(req, res, next) { 
    var user = JSON.parse(req.session.passport.user);
    User.findAll({
      where: { 'battleTag': user.battletag }
    }).then(function (users) {
      if (users.length > 1) {
        throw new Error.AuthError('BattleTag  not unique! BattleTag: ' + user.battletag);
      }
      if (users.length === 0) {
        User.create({
          'uuid': user.id,
          'battleTag': user.battletag,
          'reactStatus': 'ACTIVE'
        });
      }
      var bnClient = require('../libs/battlenet_api');
      bnClient.apiRequestBuilder(
          bnClient.apiUserWoWProfile,
          {'accessToken': user.accessToken},
          function (code, data) {
            // TODO
            // Retry? 
            if(code === 200) {
              data.characters.forEach(function (character) {
                console.log(character);
                Character.findOrCreate({
                  where: {
                    'name': character.name,
                    'realm': character.realm,
                  }
                });
              });
            }
          }).end();
      req.session.cookie.user = user;
      req.session.isLogin = true;
      var qs = querystring.stringify({
        'battletag': req.session.cookie.user.battletag
      });
      res.redirect('/?' + qs);
    });
  }); 

router.get('/logout', function(req, res){
  req.session.isLogin = null;
  //TODO: is there some way to notice BN that user has logged out?
  // and this solution is under test. known problem is it can not redirect
  // back to our site.
  res.redirect(settings.BN_LOGOUT);
});

module.exports = router;

module.exports.isLogin = function(req) {
  if(req.session.isLogin) {
    return true;
  }
  return false;
};

var onEnd = function(req, res, end) {
  req.session.resetMaxAge();
};
