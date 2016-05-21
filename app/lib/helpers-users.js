var config = require("singleton-config");
var ModelUsers = require("models-users");
var ApiService = require("api.services");

function UserHelper()
{
  Ti.API.info('UserHelper constructor');

  if (config.user == null)
    config.user = new ModelUsers().setter();

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
  var ids = [];

  this.getUserBeacons(function(results)
  {
    Ti.API.info('** beacons', results.beacons);//return;

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

  new ApiService().api("get", "users/beacons/" + config.user._id, {}, function(err, jsonResponse)
  {
    if (err)
    {
      Ti.API.info('error', err);
      //campaignListView.data = lastdata;
    }
    else
    {
      Ti.API.info('success', jsonResponse);
      return callback(jsonResponse);
    }
  });

};

module.exports = UserHelper;
