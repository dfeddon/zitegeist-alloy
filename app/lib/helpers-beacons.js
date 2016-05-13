var config = require("singleton-config");

function BeaconHelper()
{
  Ti.API.info('BeaconHelper constructor');

  this.beaconIds = [];
}

BeaconHelper.prototype.addBeaconToUserBeacons = function(beacon)
{

};

BeaconHelper.prototype.getUserBeacons = function()
{

};

BeaconHelper.prototype.getBeaconIds = function()
{
  return this.beaconIds;
};

module.exports = BeaconHelper;
