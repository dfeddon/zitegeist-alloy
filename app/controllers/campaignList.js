
var campaigns = [];

exports.addCampaignsFromBeacons = function(newCampaigns)
{
  Ti.API.info('addCampaignsFromBeacons', newCampaigns);

  // remove extant entries in store
  //campaigns = _.union(campaigns, newCampaigns);
  campaigns = newCampaigns;

  Ti.API.info('campaigns', campaigns);

  var row;
  var rowData = [];
  _.each(campaigns, function(campaign)
  {
    row = Alloy.createController("campaignListRow", campaign).getView();
    rowData.push(row);
  });

  // add to tableview
  $.tableView.data = rowData;
};
