/*
 * Examples of calling the api
 * 
 * var api = require('../battlenet_api.js');
 * var apiReq = api.apiRequestBuilder(
 *   api.apiUserWoWProfile, 
 *   {accessToken: req.session.cookie.user.accessToken},
 *   function(statusCode, data){
 *     console.log('bn api return status = ' + statusCode);
 *     console.log(require('util').inspect(JSON.parse(data)));
 *   });
 * apiReq.end();
 */


var settings = require('../settings.js');
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
 *      callback(statusCode, data);
 *    where statusCode is integeer type, data is string type. data is valid only if statusCode=200.
 *    if statusCode!=200, data *may* contains some information about the error.
 *    An example of callback is:
 *    
 *    function(statusCode, data){
 *      if(statusCode != 200) 
 *        return;
 *      var obj = JSON.parse(data);
 *      console.log('status = ' + statusCode);
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
  console.log("wahaha " + require('util').inspect(args));
  var req = https.request(opt, function(res){
	  res.setEncoding('utf8');
    var code = res.statusCode;
    console.log("wahaha type of code = " + (typeof code));
	  res.on('data', function(data){
      callback(code, data);
    });
  });
  
  req.on('error', function(e) {
    callback(-1, e.message);
  });
  
  return req;
}

/*
 * returns the path for the api to get user's wow profile (characters).
 * return format *if stutus is 200(OK)*:
 *   { "characters":[character array] }
 *   where *character* is a json object with following fields:
 *     name:        string
 *     realm:       string
 *     battlegroup: string
 *     class:       int, class id
 *     race:        int, race id
 *     gender:      int, gender id
 *     level:       int
 *     achievementPoints: int
 *     thumbnail:   string, relative url to the thumbnail
 *     lastModified:int, meaning is unclear
 * 
 * @param args: the parameters to build the path
 *   args.accessToken => accessToken in the session.
 */
exports.apiUserWoWProfile = function(args){
  return "/wow/user/characters?access_token=" + args.accessToken;
}


/*
 * return the path for the api to get guild's members list with some basic profile.
 * return format *if status is 200(OK)*:
 *   {
 *     "lastModified": int, maybe it is a time stamp 
 *     "name": string, name of the guild,
 *     "realm": string, name of the realm where the guild is,
 *     "battlegroup": string, battlegroup the guild belongs to,
 *     "level": int, level of the guild,
 *     "side": int, 0=>Alliance&1=>Horde,
 *     "achievementPoints": int, guild achievement points,
 *     "members": [member array]
 *     "emblem": {  
 *       "icon": 79,
 *       "iconColor": "ffb1b8b1",
 *       "border": 5,
 *       "borderColor": "ffffffff",
 *       "backgroundColor": "ff21dcff"
 *     }  
 *   }
 *   where *member* is a json object with following fields:
 *     character: the character object mention in *apiUserWoWProfile* 
 *                and appended with 2 more fields:
 *                  guild:      name of the guild
 *                  guildRealm: name of the realm where the guild is
 *     rank: int, the rank of the character in the guild (hui jie, 0=>hui zhang)
 * 
 * @param args: the parameters to build the path
 *   args.realm  => the name of realm where the guild is
 *   args.guild  => the name of the guild
 *   args.apiKey => the api key
 */
exports.apiGuildMembers = function(args)
{
  return "/wow/guild/"
    + args.realm + "/"
    + args.guild 
    + "?fields=members&locale=zh_CN&apikey="
    + args.apiKey;
}

/*
 * return the path for the api to get the character races data
 * return format *if status is 200(OK)*:
 *   {"races": [race array]}
 *   where *race* is a json object with following fields:
 *     id:   int, race id
 *     mask: int, the mask (1, 2, 4, 8, ..., etc. ) for the race
 *     side: string, "alliance" or "horde"
 *     name: located name of the race
 * 
 * @param args: the parameters to build the path
 *   args.apiKey => the api key
 */
exports.apiDataCharacterRaces = function(args)
{
  return "/wow/data/character/races?locale=zh_CN&apikey=" + args.apiKey;
}

/*
 * return the path for the api to get the character classes data
 * return format *if status is 200(OK)*:
 *   {"classes": [class array]}
 *   where *class* is a json object with following fields:
 *     id:        int, class id
 *     mask:      int, the mask (1, 2, 4, 8, ..., etc. ) for the class
 *     powerType: string, "mana", "rage", "focus", "energy" or "runic-power"
 *     name:      located name of the class
 * 
 * @param args: the parameters to build the path
 *   args.apiKey => the api key
 */
exports.apiDataCharacterClasses = function(args)
{
  return "/wow/data/character/classes?locale=zh_CN&apikey=" + args.apiKey;
}

//TODO: apis to be implemted....
