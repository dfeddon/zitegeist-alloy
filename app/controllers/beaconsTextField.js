var ApiService = require("api.services");
var config = require("singleton-config");

var lastdata = [];
var beaconsSelected = [];

$.textField.addEventListener("change", textFieldChangeHandler);
$.textField.addEventListener("blur", textFieldBlurHandler);
$.tableview.addEventListener('click', tableRowSelectedHandler);

function tableRowSelectedHandler(e)
{
  Ti.API.info('row select', JSON.stringify(e.rowData));

  // clear tableview
  $.tableview.setData([]);
  $.tableview.height = 0;

  // clear text field
  $.textField.value = "";

  // avoid duplicates
  var duplicate = _.contains(beaconsSelected, e.rowData._id);

  // add beacon to user TODO: (ensuring there are no duplicates in dropdown)
  if (duplicate === false)
  {
    // add to local store
    beaconsSelected.push(e.rowData._id);

    // send to cloud
    $.beacons.addBeaconToCloud(e.rowData);
  }
  else
  {
    Ti.API.info('duplicate omitted');
  }

  // dispatch
  //$.container.fireEvent("beaconsChangeEvent", {});
}

function textFieldBlurHandler(e)
{
  Ti.API.info('blur key', e.value);

  // first, ensure text is new
  var match = null;

  if (lastdata[0] && lastdata[0].rowCount > 0)
  {
    for (var item in lastdata[0].rows)
    {
      Ti.API.info('item', item, lastdata[0].rows[item]);
      if (e.value.toLowerCase() == lastdata[0].rows[item].name)
      {
        Ti.API.info('exists', e.value);
        match = lastdata[0].rows[item];
      }
    }
  }

  if (match === null)
  {
    // TODO: post new beacon
    Ti.API.info('is null, post');
  }
  else
  {
    // TODO: add beacon id to user
    Ti.API.info(JSON.stringify(match));
  }
}

function textFieldChangeHandler(e)
{
  Ti.API.info('text changed', e);

  // suppress event bubbling
  e.cancelBubble = true;

  if (e.value.length === 0)
  {
    $.tableview.setData([]);
    $.tableview.height = 0;
    return;
  }

  $.tableview.height = Ti.UI.SIZE;

  if (e.value.length < 3)
  {
    //Ti.API.info('clear text');
    $.tableview.data = lastdata;
  }
  else
  {
    Ti.API.info('search text', e.value);
    //Ti.API.info(':', e.value.length);

    new ApiService().api("get", "beacons/search/" + e.value, {}, function(err, jsonResponse)
    {
      if (err)
      {
        Ti.API.info('error', err);
        $.tableview.data = lastdata;
      }
      else
      {
        Ti.API.info('success');//, jsonResponse);

        if (jsonResponse.length === 0)
        {
          //while($.tableview.data[0].rows.length > 0)
          //{
          $.tableview.setData([{title:"None"}]);
          $.tableview.height = 0;
          //Ti.API.info('removing...', $.tableview.data[0].rows.length);
            //$.tableview.data[0].deleteRow(0);
          //}
        }
        else $.tableview.height = Ti.UI.SIZE;

        $.tableview.data = jsonResponse;
        // TODO: sort by popularity

        for (var item in jsonResponse)
        {
          // avoid rewriting title (oft leads to empty field)
          if ($.tableview.data[0].rows[item].title != jsonResponse[item].name)
            $.tableview.data[0].rows[item].title = jsonResponse[item].name;
        }
        lastdata = $.tableview.data;
      }
    });
  }
}
