/*jslint unparam: true*/
/*jslint todo: true*/

var express = require('express');
var router = express.Router();
var sql = {
  'getNotice': 'SELECT content,user_id,update_date FROM notice WHERE target = ORDER BY id DESC LIMIT 1',
  'postNotice': 'INSERT INTO notice VALUE(content=?,user_id=?,target=?)'
};
/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.sessionID);
  res.render('index', { activePage: 'index' });
  // res.send(res);
});
router.get('/index/editNotice/:target/:title', function (req, res, next) {
  res.render('notice', {
    target: req.params.target,
    pageTitle: req.params.title
  });
});
router.get('/index/notice', function (req, res, next) {
  var connection = require('../database/db');
  connection.query(sql.getNotice, [req.body.target], function (err, rows, fields) {
    if (err) {
      res.json({
        status: 1,
        message: '出错,请重试',
        error: err
      });
    } else {
      res.json({
        data: rows[0],
        status: 0,
        message: '成功'
      });
    }
  });
});
router.post('/index/notice', function (req, res, next) {
  var connection = require('../database/db');
  connection.query(sql.postNotice, [
    req.body.content,
    req.session.user.id,
    req.body.target
  ], function (err, rows, fields) {
    if (err) {
      res.json({
        status: 1,
        message: '出错,请重试',
        error: err
      });
    } else {
      res.json({
        status: 0,
        message: '成功'
      });
    }
  });
});
module.exports = router;
