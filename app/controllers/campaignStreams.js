var CampaignHelper = require("helpers-campaigns");

function postLayoutHandler(e)
{
  Ti.API.info('campaign stream postLayoutHandler', e);
}

$.container.addEventListener("campaignListCreated", campaignListCreatedHandler);

function campaignListCreatedHandler(e)
{
  e.cancelBubble = true;
  Ti.API.info('campaignListCreatedHandler (campaignStream)', e);

  Ti.API.info('nav current', config.navigation.current.from, config.navigation.current.to);

  if (config.navigation.current.to == "campaignStreams")
  {
    new CampaignHelper().searchCampaignsByBeaconIds(function(results)
    {
      Ti.API.info('results', results);

      var campaigns = [];
      _.each(results, function(campaign)
      {
        if (campaign.brand.owner._id != config.user._id)
          campaigns.push(campaign);
        else Ti.API.info('omitting campaign', campaign);
      });

      // filter user's own campaigns from results
      $.campaignListView.addCampaignsFromBeacons(campaigns);
    });
  } // campaignStream
  else if (config.navigation.current.to == "myProfile")
  {
    new CampaignHelper().searchCampaignsByBrandId(config.user.brand._id, function(results)
    {
      Ti.API.info('results', results);

      var campaigns = [];
      _.each(results, function(campaign)
      {
          campaigns.push(campaign);
      });
      $.campaignListView.addCampaignsFromBeacons(campaigns);
    });
  }
  else if (config.navigation.current.to == "userProfile")
  {
    Ti.API.info('brand=', config.navigation.data);
    new CampaignHelper().searchCampaignsByBrandId(config.navigation.data._id, function(results)
    {
      Ti.API.info('results', results);

      var campaigns = [];
      _.each(results, function(campaign)
      {
          campaigns.push(campaign);
      });
      $.campaignListView.addCampaignsFromBeacons(campaigns);
    });
  }
}
