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
// And it seems UserGroup is needed since the event should be send to a group of users instead of one by one.
var User = db.define('User', {
  uuid: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
}, {
  underscored: true,
  tableName: 'user'
});
exports.User = User;

var Notice = db.define('Notice', {
  authorId: {
    field: 'author_id',
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
  launcherId: {
    field: 'launcher_id',
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM,
    values: ['ONLINE', 'OFFLINE'],
    allowNull: false,
  },
  startAt: {
    field: 'start_at',
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
}, {
  underscored: true,
  tableName: 'event'
});
exports.Event = Event;

var React = db.define('React', {
  eventId: {
    field: 'event_id',
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false
  },
  participantId: {
    field: 'participant_id',
    type: Sequelize.STRING,
    allowNull: false
  },
  replyStatus: {
    field: 'replay_status',
    type: Sequelize.ENUM,
    values: ['PENDING', 'ACCEPT', 'DENY', 'DELAY'],
    allowNull: false
  },
  replyAt: {
    field: 'reply_at',
    type: Sequelize.DATE
  },
  replyContent: {
    field: 'replay_content',
    type: Sequelize.STRING,
    defaultValue: ''
  }
}, {
  underscored: true,
  tableName: 'react'
});
exports.React = React;
