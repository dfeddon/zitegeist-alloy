var config = require("singleton-config");
var ApiService = require("api.services");

var isLoaded = false;
var data = config.navigation.data;
var metric;
var page = 0;

Ti.API.info('config data', config.navigation.data);

$.teaserText.text = config.navigation.data.teaser;
$.brandSubheader.text = config.navigation.data.owner.displayName;

function postLayoutHandler(e)
{
  Ti.API.info('surveyView postLayoutHandler', e);

  if (isLoaded === false)
  {
    isLoaded = true;
    // load metric 1
    loadMetric();
  }
}

function loadMetric()
{
  page++;
  new ApiService().api("get", "metrics/" + data.metrics[page - 1], {}, function(err, jsonResponse)
  {
    if (err)
    {
      Ti.API.info('error', err);
      //campaignListView.data = lastdata;
    }
    else
    {
      Ti.API.info('success', jsonResponse);
      metric = jsonResponse;

      // populate fields
      $.questionText.text = jsonResponse.question;
      $.campaignSubheader.text = jsonResponse.name;

      var row;
      var rowData = [];
      _.each(jsonResponse.items, function(metricItem)
      {
        row = Alloy.createController("metricItemRow", metricItem).getView();
        rowData.push(row);
      });

      // add to tableview
      $.tableView.data = rowData;
    }
  });
}
