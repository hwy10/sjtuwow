var mysql = require('mysql');
var setting = require('./settings') 
var connection = mysql.createConnection({
  host     : setting.HOST,
  user     : setting.USERNAME,
  password : setting.PASSWORD,
  database : setting.DB
});

module.exports = connection