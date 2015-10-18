var settings = require('./settings');
var Sequelize = require('sequelize');
// Init Database
var db = new Sequelize(settings.DB_NAME, settings.DB_USERNAME, settings.DB_PASSWORD, {
  host: settings.DB_HOST,
  port: settings.DB_PORT,
  dialect: settings.DB_DIALECT,
  timezone: settings.DB_TIMEZONE
});
exports.db = db;

// TODO
// Add fields needed for BattleNetAPI @GanZhenye
var User = db.define('user', { uuid: Sequelize.STRING }, { freezeTableName: true });
exports.User = User;

var Notice = db.define('notice', {
  content: Sequelize.TEXT,
  userUid: Sequelize.STRING
}, { freezeTableName: true });
exports.Notice = Notice;
