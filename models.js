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
var User = db.define('User', { uuid: Sequelize.STRING }, {
  underscored: true,
  tableName: 'user'
});
exports.User = User;

var Notice = db.define('Notice', {
  authorUuid: {
    field: 'author_uuid',
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: ''
  }
}, {
  underscored: true,
  tableName: 'notice'
});
exports.Notice = Notice;

var Event = db.define('Event', {
  launcherUuid: {
    field: 'launcher_uuid',
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM,
    values: ['ONLINE', 'OFFLINE'],
    allowNull: false,
  },
  startTime: {
    field: 'start_time',
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  address: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
    // participantUuid: Sequelize.STRING
}, {
  underscored: true,
  tableName: 'event'
});
exports.Event = Event;
