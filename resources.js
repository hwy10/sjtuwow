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
  // TODO
  // Update should recode not to update battle_tag.
  actions: ['read', 'update', 'list']
});
exports.UserResource = UserResource;

var CharacterResource = epilogue.resource({
  model: models.Character,
  actions: ['read', 'list']
});
exports.CharacterResource = CharacterResource;

var ClassResource = epilogue.resource({
  model: models.Class,
  actions: ['read', 'list']
});
exports.ClassResource = ClassResource;

var NoticeResource = epilogue.resource({
  model: models.Notice,
});
exports.NoticeResource = NoticeResource;

var EventResource = epilogue.resource({
  model: models.Event,
  // TODO
  // delete should be recode instead of using the default one.
  actions: ['create', 'read','update', 'list']
});
exports.EventResource = EventResource;

var ReactResource = epilogue.resource({
  model: models.React,
  // TODO
  // delete should be recode instead of using the default one.
  actions: ['create', 'read','update', 'list']
});
exports.ReactResource = ReactResource;
