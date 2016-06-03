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
}
