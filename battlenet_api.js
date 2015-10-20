/*
 * Examples of calling the api
 * 
 * var api = require('../battlenet_api.js');
 * var apiReq = api.apiRequestBuilder(
 *   api.apiUserWoWProfile, 
 *   {accessToken: req.user.accessToken},
 *   function(data){
 *     console.log(require('util').inspect(JSON.parse(data)));
 *   });
 * apiReq.end();
 */


var settings = require('./settings.js');
var https = require('https');

/*
 *  return a https.request to a certain battlenet api listed in this file. 
 *  call req.end() to perform the request
 * 
 *  @param apiUriBuilder: the function implemented in this file that will generate 
 *    uri for the api (including the parameters)
 *  @param args: parameters needed by *apiUriBuilder*, its fields depend on implementation
 *    of *apiUriBuilder*, refer to the certain api for more information. this function will
 *    call:
 *       apiPath = apiUriBuilder(args);
 *    apiPath is a string that contains the api path including parameters.
 *  @param callback: the function process the data api returns. the function will be call 
 *    like this way:
 *      callback(data);
 *    where data is string type. an example of callback is 
 *    function(data){
 *      var obj = JSON.parse(data);
 *      console.log(data);
 *      insertIntoDb(obj);
 *    }
 */

exports.apiRequestBuilder = function(apiUriBuilder, args, callback){
  var opt = {
    host: settings.BN_API_HOST,
	  path: apiUriBuilder(args),
	  method: "GET"
  };
  
  var req = https.request(opt, function(res){
	 res.setEncoding('utf8');
	 res.on('data', callback);
  });
  
  return req;
}

/*
 * returns the path for the api to get user's wow profile (characters).
 * 
 * @param args: the parameters to build the path
 *   args.accessToken => accessToken in the session.
 */
exports.apiUserWoWProfile = function(args){
  return "/wow/user/characters?access_token=" + args.accessToken;
}

//TODO: apis to be implemted....
