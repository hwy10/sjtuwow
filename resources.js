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

var NoticeResource = epilogue.resource({
  model: models.Notice,
});

exports.NoticeResource = NoticeResource
