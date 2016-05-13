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
    $.campaignListView.addCampaignsFromBeacons(results);
  });
}
