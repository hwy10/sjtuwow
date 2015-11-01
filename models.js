var settings = require('./settings');
var Sequelize = require('sequelize');
// Init Database
var db = new Sequelize(settings.DB_NAME, settings.DB_USERNAME, settings.DB_PASSWORD, {
  host: settings.DB_HOST,
  port: settings.DB_PORT,
  dialect: settings.DB_DIALECT,
  // timezone: settings.DB_TIMEZONE,
  pool: {
    maxConnections: 4,
    minConnections: 0,
    maxIdleTime: 10000,
  }
});
exports.db = db;

var User = db.define('User', {
  uuid: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  battleTag: {
    field: 'battle_tag',
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  reactStatus: {
    field: 'react_status',
    type: Sequelize.ENUM,
    values: ['ACTIVE', 'AFK'],
    defaultValue: 'ACTIVE'
  },
  mainCharacterId: {
    field: 'main_character_id',
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true
  }
}, {
  underscored: true,
  tableName: 'user'
});
exports.User = User;

// This table should only be updated by system.
var Character = db.define('Character', {
  classId: {
    field: 'class_id',
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  realm: {
    type: Sequelize.STRING,
    allowNull: false
  },
  level: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true
  },
  averageItemLevel: {
    field: 'average_item_level',
    type: Sequelize.INTEGER.UNSIGNED,
    defaultValue: 0
  },
  averageItemLevelEquipped: {
    field: 'average_item_level_equitted',
    type: Sequelize.INTEGER.UNSIGNED,
    defaultValue: 0
  }
}, {
  underscored: true,
  tableName: 'character'
});
exports.Character = Character;

// This table should only be updated by system.
var Class = db.define('Class', {
  uuid: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  underscored: true,
  tableName: 'class'
});
exports.Class = Class;

var Notice = db.define('Notice', {
  authorId: {
    field: 'author_id',
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
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
    type: Sequelize.TEXT
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
  characterId: {
    field: 'character_id',
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true
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
