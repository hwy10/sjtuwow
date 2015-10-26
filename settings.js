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

exports.SEVER_PORT = 443;

exports.STATIC_URL = '/static';
exports.STATIC_ROOT = path.join(__dirname, 'public');

exports.VIEW_ROOT = path.join(__dirname, 'views');

exports.AUTH_HEADER_NAME = 'X-AUTH-TOKEN';

/*
 * API Constants
 */
exports.API_URL = '/api';

/*
 * Cookie & Session settings
 */
exports.COOKIE_TIMEOUT = 24 * 60 * 60 * 1000;
exports.SESSION_NAME = 'sjtuwow';
exports.SESSION_TIMEOUT = exports.COOKIE_TIMEOUT;
exports.SESSION_CHECK_EXPIRE_INTERVAL = 15 * 60 * 1000;

/*
 * The following constants should be changed in your own config.json at the root of the project.
 * Example of the config.json:
 * {
 *   "DB_NAME" : "sjtuwow",
 *   "DB_USERNAME" : "root",
 *   "DB_PASSWORD" : "123456",
 *   "BN_OAUTH": {
 * 		"KEY": "your_key",
 *   	"SECRET": "your_key_secret",
 *   },
 *   "SITE_HTTPS_KEY": "/home/your_user/your_private_key.pem"
 *   "SITE_HTTPS_CERT": "/home/your_user/your_cert.pem"
 * }
 */

/*
 * https setttings
 */
exports.ENV = nconf.get('ENV') || "development";
exports.SITE_HTTPS_KEY = nconf.get('SITE_HTTPS_KEY') || path.join(__dirname, 'private_key.pem');
exports.SITE_HTTPS_CERT = nconf.get('SITE_HTTPS_CERT')|| path.join(__dirname, 'cert.pem');

/*
 * DB Constants
 */
exports.DB_HOST = nconf.get('DB_HOST') || '127.0.0.1';
exports.DB_PORT = nconf.get('DB_PORT') || '3306';
exports.DB_DIALECT = nconf.get('DB_DIALECT') || 'mysql';
exports.DB_NAME = nconf.get('DB_NAME') || '';
exports.DB_USERNAME = nconf.get('DB_USERNAME') || '';
exports.DB_PASSWORD = nconf.get('DB_PASSWORD') || '';
exports.DB_TIMEZONE = nconf.get('DB_TIMEZONE') || '+00:00';

/*
 * BN oauth Constants
 */
exports.BN_OAUTH = nconf.get('BN_OAUTH') || {'KEY':'', 'SECRET':''};
exports.BN_CALLBACK = 'https://sjtuwow.azurewebsites.net/auth/login/callback';
exports.BN_LOGOUT = 'https://www.battlenet.com.cn/login/logout?ref=https://https://sjtuwow.azurewebsites.net/';

/*
 * BN API URLs
 */
exports.BN_API_HOST = 'api.battlenet.com.cn';
