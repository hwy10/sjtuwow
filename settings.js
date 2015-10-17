// global settings for the project
//
// Please define your own config items in config.json.
// e.g.
//  {
//    "DB_NAME" : "sjtuwow",
//    "DB_USERNAME" : "root",
//    "DB_PASSWORD" : "123456"
//  }
exports.DEBUG = true;
var path = require('path');
var nconf = require('nconf');
nconf.file(path.join(__dirname, 'config.json'));
// DB Constants
exports.DB_HOST = nconf.get('DB_HOST') ? nconf.get('DB_HOST') : '127.0.0.1';
exports.DB_PORT = nconf.get('DB_PORT') ? nconf.get('DB_PORT') : '3306';
exports.DB_DIALECT = nconf.get('DB_DIALECT') ? nconf.get('DB_DIALECT') : 'mysql';
exports.DB_NAME = nconf.get('DB_NAME') ? nconf.get('DB_NAME') : '';
exports.DB_USERNAME = nconf.get('DB_USERNAME') ? nconf.get('DB_USERNAME') : '';
exports.DB_PASSWORD = nconf.get('DB_PASSWORD') ? nconf.get('DB_PASSWORD') : '';
exports.DB_TIMEZONE = nconf.get('DB_TIMEZONE') ? nconf.get('DB_TIMEZONE') : '+00:00'
