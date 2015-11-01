/*jslint unparam: true*/

var util = require('util');

function BaseHttpError (message, httpCode, error) {
  this.message = message;
  this.httpCode = httpCode || 500;
  this.error = error;
}

function AuthError (message, error) {
  AuthError.super_.call(this, message, 401, error);
}
util.inherits(AuthError, BaseHttpError);
exports.AuthError =  AuthError;

exports.error_handler = function (err, req, res, next) {
  console.log(err.error);
  res.status(err.httpCode || 500).send({
    'message': err.message
  });
};
