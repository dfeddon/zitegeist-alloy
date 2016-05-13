var firstRun = false;
var campaigns = [];

function postLayoutHandler(e)
{
  Ti.API.info('campaignListView postLayoutHandler', e);

  // there can be only one!
  if (firstRun === false)
  {
    Ti.API.info('firing created handler');
    $.container.fireEvent("campaignListCreated", {tableView: $.tableView, view:this});
    firstRun = true;
  }
}

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
