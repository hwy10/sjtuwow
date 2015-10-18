var path = require('path');
var epilogue = require('epilogue');
var models = require('./models');
var app = require('./app');
var settings = require('./settings');

epilogue.initialize({
  app: app,
  sequelize: models.db,
  updateMethod: 'PUT',
  base: path.join(settings.API_URL, '/v1')
});

var UserResource = epilogue.resource({
  model: models.User,
  actions: ['read', 'update', 'list']
});
exports.UserResource = UserResource;

var NoticeResource = epilogue.resource({
  model: models.Notice,
});
exports.NoticeResource = NoticeResource;

var EventResource = epilogue.resource({
  model: models.Event,
});
exports.EventResource = EventResource;
