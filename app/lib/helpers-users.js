var config = require("singleton-config");
var ModelUsers = require("models-users");

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

UserHelper.prototype.getUserBeaconIds = function()
{
  var ids = [];

  if (config.user && config.user.beacons)
  {
    Ti.API.info('array::', config.user.beacons);
    _.each(config.user.beacons, function(beacon)
    {
      Ti.API.info('::', beacon);
      ids.push(beacon);
    });
  }

  return ids;
};

module.exports = UserHelper;
