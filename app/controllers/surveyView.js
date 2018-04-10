var config = require("singleton-config");
var ApiService = require("api.services");

var ROW_SELECTED_COLOR = "blue";

var isLoaded = false;
var data = config.navigation.data;
var metric;
var page = 0;

Ti.API.info('config data', config.navigation.data);

$.teaserText.text = config.navigation.data.teaser;
$.brandSubheader.text = config.navigation.data.brand.owner.displayName;

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
      resetMetricItemRows(true);
    }
  });
}

$.container.addEventListener("metricItemSelected", metricItemSelectedHandler);

function resetMetricItemRows(force)
{
  Ti.API.info('rows:', $.tableView.data[0].rowCount);

  var count = 1;
  _.each($.tableView.data[0].rows, function(row)
  {
    Ti.API.info(':', JSON.stringify(row));
    //if (row.backgroundColor == ROW_SELECTED_COLOR || force === true)
    if ((row.classes && row.classes[0] == "rowStyleSelected") || force === true)
    {
      if (force === false)
        $.removeClass(row, row.classes[0]);
      //row.backgroundColor = (count % 2 === 0) ? '#80d7daff' : 'white';
      $.addClass(row, (count % 2 === 0) ? "rowStyleUnselectedAlt" : "rowStyleUnselected");
    }
    count++;
  });
  //var row;
  //row = $.tableView.selectRow(x);
}

function metricItemSelectedHandler(e)
{
  Ti.API.info('metricItemSelectedHandler', e);
  if (data.multiples === false)
    resetMetricItemRows(false);
  // if (e.row.backgroundColor == ROW_SELECTED_COLOR)
  //   e.row.backgroundColor = (e.args.index % 2 === 0) ? "#80d7daff" : "white";
  // else e.row.backgroundColor = ROW_SELECTED_COLOR;
  Ti.API.info('classname', e.row.classes[0]);
  if (e.row.classes[0] == "rowStyleSelected")
  {
    $.removeClass(e.row, e.row.classes[0]);
    $.addClass(e.row, (e.args.index % 2 === 0) ? "rowStyleUnselectedAlt" : "rowStyleUnselected");
  }
  else
  {
    Ti.API.info('select style', typeof(e.row), e.row);
    $.removeClass(e.row, e.row.classes[0]);
    Ti.API.info('class removed, now adding...');
    $.addClass(e.row, "rowStyleSelected");
    //$.addClass(e.row.getView("rowIndex", "rowStyleSelected");
    //Ti.API.info('classname', e.row.classes);
    //Ti.API.info('rowlabel', e.row.children[0];
  }
}

function tableViewCreated(e)
{
  Ti.API.info('tableview created');
}
