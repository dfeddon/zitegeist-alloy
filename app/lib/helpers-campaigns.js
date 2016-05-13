var config = require("singleton-config");
var ApiService = require("api.services");
var UserHelper = require("helpers-users");
//var ModelUsers = require("models-users");

function CampaignHelper()
{
  Ti.API.info('CampaignHelper constructor');

  if (config.campaigns == null)
    config.campagins = [];
}

CampaignHelper.prototype.setter = function(array)
{
  config.campaigns = array;
};

CampaignHelper.prototype.addCampaign = function(campaign)
{
  config.campaigns.push(campaign);

  return campaigns;
};

CampaignHelper.prototype.getCampaigns = function()
{
  return config.campaigns;
};

CampaignHelper.prototype.getCampaignIds = function()
{
  var ids = [];

  if (config.campaigns)
  {
    _.each(config.campaigns, function(campaign)
    {
      ids.push(campaign._id);
    });
  }

  return ids;
};

CampaignHelper.prototype.searchCampaignsByBeaconIds = function(callback)
{
  var beaconIds = new UserHelper().getUserBeaconIds();
  beaconsIds = beaconIds.toString();
  Ti.API.info('beaconIds', beaconIds); //"5709236964c0c51739826745,570927f764c0c51739826747"
  //return;
  new ApiService().api("get", "campaigns/beacons/search/" + beaconIds, {}, function(err, jsonResponse)
  {
    if (err)
    {
      Ti.API.info('error', err);
      //campaignListView.data = lastdata;
    }
    else
    {
      Ti.API.info('success');//, jsonResponse);
      new CampaignHelper().setter(jsonResponse);
      Ti.API.info('campaigns', new CampaignHelper().getCampaigns());
      callback(new CampaignHelper().getCampaigns());
      //campaignListView.addCampaignsFromBeacons(jsonResponse);
    }
  });
}

module.exports = CampaignHelper;
