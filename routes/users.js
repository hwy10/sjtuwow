var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var sql = {
  register: 'INSERT INTO user(username,password,name,email) VALUES(?,?,?,?)',
  login: 'SELECT * FROM user WHERE username=? and password=?',
  username_verification: 'SELECT id FROM user WHERE username=?',
  name_verification: 'SELECT id FROM user WHERE name=?',
  area_list: {
    'username': '用户名',
    'password': '密码',
    'name': '昵称',
    'email': '邮箱'
  },
  add_character: 'INSERT INTO characters(name,duty,race,profession,user_id) VALUES(?,?,?,?,?)',
  select_character: 'SELECT * FROM characters WHERE user_id = ?',
  delete_character: 'DELETE FROM characters WHERE id = ? and user_id = ?',
  info_list: [
    'name',
    'email'
  ],
  edit_info: [
    'UPDATE user SET ',
    '=? WHERE id=?'
  ],
  user_info: 'SELECT username,name,email FROM user WHERE id=?'
};
/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('users/login', { activePage: 'login' });
});
router.post('/login', function (req, res, next) {
  var md5 = crypto.createHash('md5');
  var username = req.body.username;
  var password = md5.update(req.body.password).digest('base64');
  var connection = require('../database/db');
  connection.query(sql.login, [
    username,
    password
  ], function (err, rows, fields) {
    if (!err && rows.length > 0) {
      req.session.user = {
        username: rows[0].username,
        name: rows[0].name,
        email: rows[0].email,
        id: rows[0].id
      };
      res.json({
        status: 0,
        message: '登陆成功'
      });
      return;
    } else if (err) {
      res.json({
        status: 1,
        message: '登陆出错,请重试',
        error: err
      });
      return;
    } else {
      res.json({
        status: 1,
        message: '用户名密码错误,请重试',
        error: err
      });
      return;
    }
  });
});
router.get('/register', function (req, res, next) {
  res.render('users/register', { activePage: 'register' });
});
router.post('/register', function (req, res, next) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  for (var i in sql.area_list) {
    if (!req.body[i]) {
      res.json({
        status: 1,
        message: area_list[i] + '不能为空'
      });
      return;
    }
  }
  if (req.body.question != '凋枯残影') {
    res.json({
      status: 1,
      message: '问题回答错误'
    });
    return;
  }
  var connection = require('../database/db');
  // connection.connect()
  connection.query(sql.username_verification, [req.body.username], function (err, rows, fields) {
    if (rows.length > 0) {
      res.json({
        status: 1,
        message: '用户名冲突',
        info: JSON.stringify(rows)
      });
      return;
    } else {
      connection.query(sql.name_verification, [req.body.name], function (err, rows, fields) {
        if (rows.length > 0) {
          res.json({
            status: 1,
            message: '昵称冲突'
          });
          return;
        } else {
          connection.query(sql.register, [
            req.body.username,
            password,
            req.body.name,
            req.body.email
          ], function (err, rows, fields) {
            if (!err) {
              req.session.user = {
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                id: rows.insertId
              };
              res.json({
                status: 0,
                message: '注册完毕'
              });
              return;
            } else {
              res.json({
                status: 1,
                message: '注册失败\uFF0C请重试',
                error: err
              });
              return;
            }
          });
        }
      });
    }
  })  // console.log(query.sql)
      // connection.end()
;
});
router.get('/logout', function (req, res, next) {
  if (req.session)
    req.session.user = null;
  res.render('users/login', { activePage: 'login' });
});
router.get('/changeInfo', function (req, res, next) {
  res.render('users/changeInfo', { activePage: 'changeInfo' });
});
router.get('/userInfo', function (req, res, next) {
  var connection = require('../database/db');
  connection.query(sql.user_info, [req.session.user.id], function (err, rows, fields) {
    if (err) {
      res.json({
        status: 1,
        message: '获取失败\uFF0C请重试',
        error: err
      });
    } else {
      for (i in rows[0]) {
        req.session.user[i] = rows[0][i];
      }
      res.json({
        status: 0,
        data: rows[0]
      });
    }
  });
});
router.post('/userInfo', function (req, res, next) {
  if (sql.info_list.indexOf(req.body.field) >= 0) {
    var connection = require('../database/db');
    connection.query(sql.edit_info[0] + req.body.field + sql.edit_info[1], [
      req.body.data,
      req.session.user.id
    ], function (err, rows, fields) {
      if (err) {
        res.json({
          status: 1,
          message: '修改失败\uFF0C请重试 ' + err,
          field: req.body.field,
          error: err
        });
      } else {
        res.json({
          status: 0,
          message: '修改成功!',
          field: req.body.field
        });
      }
    });
  } else {
    res.json({
      status: 1,
      message: '修改失败\uFF0C请重试'
    });
  }
});
router.get('/character', function (req, res, next) {
  var connection = require('../database/db');
  connection.query(sql.select_character, [req.session.user.id], function (err, rows, fields) {
    if (err) {
      res.json({
        status: 1,
        error: err
      });
      return;
    } else {
      res.json({
        status: 0,
        data: rows
      });
      return;
    }
  });
});
router.post('/character', function (req, res, next) {
  var duty = 0;
  dutys = req.body.dutys.split(',');
  for (i in dutys) {
    duty += parseInt(dutys[i]);
  }
  var connection = require('../database/db');
  connection.query(sql.add_character, [
    req.body.name,
    duty,
    req.body.race,
    req.body.profession,
    req.session.user.id
  ], function (err, rows, fields) {
    if (err) {
      res.json({
        status: 1,
        message: '添加失败\uFF0C请重试',
        error: err
      });
      return;
    } else {
      res.json({
        status: 0,
        message: '添加成功'
      });
      return;
    }
  });
});
router.delete('/character', function (req, res, next) {
  var connection = require('../database/db');
  connection.query(sql.delete_character, [
    req.body.id,
    req.session.user.id
  ], function (err, rows, fields) {
    if (err) {
      res.json({
        status: 1,
        message: '删除失败\uFF0C请重试',
        error: err
      });
      return;
    } else {
      res.json({
        status: 0,
        message: '删除成功'
      });
      return;
    }
  });
});
module.exports = router;
