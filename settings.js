// Global settings for the project

/*
 * The following constants are not suggested to be changed.
 */
var path = require('path');
var nconf = require('nconf');
nconf.file(path.join(__dirname, 'config.json'));

// MD5 of "a website for sjtuwower"
exports.SECRET_KEY = 'E1925844EDED520E2B8B6CCD4F21E911';

exports.DEBUG = true;
exports.SEVER_PORT = 3000;

exports.STATIC_URL = '/static';
exports.STATIC_ROOT = path.join(__dirname, 'public');

exports.VIEW_ROOT = path.join(__dirname, 'views');

/*
 * API Constants
 */
exports.API_URL = '/api';

/*
 * Session Constants
 */
exports.SESSION_NAME = 'sjtuwow';

/*
 * Cookie timeout
 */
exports.COOKIE_TIMEOUT = 7 * 24 * 60 * 60 * 1000;

/*
 * The following constants should be changed in your own config.json at the root of the project.
 * Example of the config.json:
 * {
 *   "DB_NAME" : "sjtuwow",
 *   "DB_USERNAME" : "root",
 *   "DB_PASSWORD" : "123456"
 * }
 */

/*
 * DB Constants
 */
exports.DB_HOST = nconf.get('DB_HOST') ? nconf.get('DB_HOST') : '127.0.0.1';
exports.DB_PORT = nconf.get('DB_PORT') ? nconf.get('DB_PORT') : '3306';
exports.DB_DIALECT = nconf.get('DB_DIALECT') ? nconf.get('DB_DIALECT') : 'mysql';
exports.DB_NAME = nconf.get('DB_NAME') ? nconf.get('DB_NAME') : '';
exports.DB_USERNAME = nconf.get('DB_USERNAME') ? nconf.get('DB_USERNAME') : '';
exports.DB_PASSWORD = nconf.get('DB_PASSWORD') ? nconf.get('DB_PASSWORD') : '';
exports.DB_TIMEZONE = nconf.get('DB_TIMEZONE') ? nconf.get('DB_TIMEZONE') : '+00:00';
