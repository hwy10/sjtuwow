var express = require('express');
var User = require('../models').User;

var router = express.Router();

router.get('/auth/login', function (req, res, next) {
  return res.render('auth/login', { activePage: 'login' });
});

// TODO
// Wait to be replaced by BattleNetAPI @GunZhenye
// The following is only for test.
router.post('/auth/login', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.findAll({
    where: {
      id: username,
      uuid: password
    }
  }).then(function (users) {
    if (users.length > 0) {
      req.session.user = users[0].id;
      res.json({
        status: 0,
        message: '登陆成功'
      });
    } else {
      req.session.user = null;
      res.json({
        status: 1,
        message: '用户名密码错误,请重试'
      });
    }
    res.redirect('/');
  });
});

router.get('/auth/logout', function (req, res, next){
  req.session.user = null;
  return res.redirect('/auth/login');
})

module.exports = router
