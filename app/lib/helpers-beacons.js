var config = require("singleton-config");
var UserHelper = require("helpers-users");

function BeaconHelper()
{
  Ti.API.info('BeaconHelper constructor');

  this.beacons = config.beacons;
}

BeaconHelper.prototype.addUserBeacon = function(beacon)
{
  Ti.API.info('beaconHelper - addUserBeacon', beacon);
  config.beacons.push(beacon);
};

BeaconHelper.prototype.getUserBeacons = function()
{
  return config.beacons;
};

BeaconHelper.prototype.userBeaconExistsById = function(id)
{
  var val = false;
  //Ti.API.info('test', _.findWhere(config.beacons, {_id:id}));
  var user = new UserHelper().getUser();
  Ti.API.info('userBeaconExistsById', user)
  if (_.findWhere(user.beacons, {beacon:id}) != undefined)
    val = true;

  Ti.API.info('userBeaconExistsById', id, val);

  return val;
};

BeaconHelper.prototype.userBeaconExistsByName = function(name)
{
  var val = false;

  if (_.findWhere(config.user.beacons, {name:name}))
    val = true;

  return val;
};


BeaconHelper.prototype.getBeaconIds = function()
{
  return this.beaconIds;
};

module.exports = BeaconHelper;
