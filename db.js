var settings = require('./settings');
var Sequelize = require('sequelize');
// Init Database
var sequelize = new Sequelize(settings.DB_NAME, settings.DB_USERNAME, settings.DB_PASSWORD, {
  host: settings.DB_HOST,
  port: settings.DB_PORT,
  dialect: settings.DB_DIALECT,
  timezone: settings.DB_TIMEZONE
});
// TODO
// Add fields needed for BattleNetAPI @GanZhenye
var User = sequelize.define('user', { uuid: Sequelize.STRING }, { freezeTableName: true });
User.sync({ hooks: true });
exports.User = User;
var Notice = sequelize.define('notice', {
  content: Sequelize.TEXT,
  userUid: Sequelize.STRING
}, { freezeTableName: true });
Notice.sync({ hooks: true });
exports.Notice = Notice
