var ModalPickerComponent = require("components.modalPicker");
var MetricModel = require("models.metrics");
var ViewHelper = require("helpers.view");
var TableRowMetricItemDesign = require("tableRows.metricItemDesign");

var answerTypeIndex = 0;
var metricVO = new MetricModel();

typeSubviewsManager();

createTableRows();

function createTableRows()
{
  var row;
  var rows = [];
  var results = [{name:"Row A and let's see how man lines we can fit here..."},{name:"Row 2"},{name:"Row 3"},{name:"Row 4"}];
  _.each(results, function(item)
  {
    row = new TableRowMetricItemDesign().createRow();
    //row.labelText.text = item.name;
    row.data = item;
    //rows.push(row);
    $.itemsTable.appendRow(row);
    Ti.API.info(':row',JSON.stringify(row));
  });
  //$.itemsTable.data = rows;
}

function orderChangeHandler(e)
{
  Ti.API.info('orderChangeHandler', e);

  if (e.value === false)
    $.itemsTable.moving = false;
  else $.itemsTable.moving = true;
}

function itemTableChangeHandler(e)
{
  Ti.API.info('itemTableChangeHandler', e.type, e);
}

$.itemsTable.addEventListener("rowChangeEvent", tableRowChangeEventHandler);
function tableRowChangeEventHandler(e)
{
  Ti.API.info('tableRowChangeEventHandler', e);

  var totalRowHeight = 0;
  var origHeight = $.itemsTable.toImage().height;
  _.each($.itemsTable.data[0].rows, function(item)
  {
    Ti.API.info('::item', item.toImage().height);
    totalRowHeight+= item.toImage().height;
  });
  $.itemsTable.height = totalRowHeight + origHeight;
  Ti.API.info('table height post', $.itemsTable.height);
}

function addRowHandler(e)
{
  var row = new TableRowMetricItemDesign().createRow();
  $.itemsTable.appendRow(row);
  tableRowChangeEventHandler();
  //$.itemsTable.height = 50;
}

function changeAnswerTypeHandler(e)
{
  Ti.API.info('changeRewardsTypeHandler', e);
  var rows = [
    { title:"Selection", value:"selection", index:0},
    { title:"Ranking", value:"ranking", index:1},
    { title:"Rating", value:"rating", index:2},
    { title:"Slider", value:"slider", index:3},
    { title:"Text", value:"text", index:4},
    { title:"Essay", value:"essay", index:5}
  ];
  // get currently selected index
  //switch()
  new ModalPickerComponent().createComponent(rows, "Answer Type", answerTypeIndex, answerTypeSelectedHandler);
}

function answerTypeSelectedHandler(e)
{
  $.answerType.title = e.title;
  answerTypeIndex = e.index;

  // update vo
  metricVO.type = e.value;
  Ti.API.info('vo', metricVO);

  // update subviews
  typeSubviewsManager();
}

function typeSubviewsManager()
{
  Ti.API.info('rewardsSubviewsManager', metricVO.type);
  var view = new ViewHelper();

  switch(metricVO.type)
  {
    case "selection":
      //view.hideElement($.rewardsCouponView);
      view.showElement($.multiSelectView);
      view.showElement($.itemsView);
    break;

    case "ranking":
      view.hideElement($.multiSelectView);
      view.showElement($.itemsView);
    break;

    case "rating":
      view.hideElement($.multiSelectView);
      view.hideElement($.itemsView);
    break;

    case "slider":
      view.hideElement($.multiSelectView);
      view.hideElement($.itemsView);
    break;

    case "text":
      view.hideElement($.multiSelectView);
      view.hideElement($.itemsView);
    break;

    case "essay":
      view.hideElement($.multiSelectView);
      view.hideElement($.itemsView);
    break;
  }
}
