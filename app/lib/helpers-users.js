var config = require("singleton-config");
var ModelUsers = require("models-users");
var ApiService = require("api.services");

function UserHelper()
{
  Ti.API.info('UserHelper constructor');

  //if (config.user == null)
    //config.user = new ModelUsers().setter();
    this.user = config.user;

  //this.users = [];
  //this.user = null;
}

UserHelper.prototype.addUser = function(user)
{
  config.users.push(user);
  config.user = user;

  return config.user.getter();
};

UserHelper.prototype.getUser = function()
{
  return config.user;//.getter();
};

UserHelper.prototype.getUserBeaconIds = function(callback)
{
  Ti.API.info('getUserBeaconIds==', this.user);
  var ids = [];

  this.getUserBeacons(function(results)
  {
    Ti.API.info('** user beacons', results.length, results);//return;

    if (config.user && results.length > 0)
    {
      Ti.API.info('array::', results);
      _.each(results, function(item)
      {
        Ti.API.info('::', item);
        ids.push(item.beacon._id);
      });
    }
    //Ti.API.info('ids:', ids);

    return callback(ids);
  });
};

UserHelper.prototype.getUserBeacons = function(callback)
{
  Ti.API.info('GET users/beacons');
  new ApiService().api("get", "users/beacons/" + config.user._id, {}, function(err, jsonResponse)
  {
    if (err)
    {
      Ti.API.info('error', err);
      //campaignListView.data = lastdata;
    }
    else
    {
      Ti.API.info('success (GET /users/beacons)', jsonResponse);
      return callback(jsonResponse);
    }
  });
};

UserHelper.prototype.userBrandRanks = function(ranks)
{
  if (ranks == null)
    return config.userBrand.ranks;
  else config.userBrand.ranks = ranks;
};

UserHelper.prototype.isFollowing = function(id)
{
  if (_.findWhere(config.userFollowing, { 'brand': id }) !== undefined)
    return true;
  else return false;
};

module.exports = UserHelper;
