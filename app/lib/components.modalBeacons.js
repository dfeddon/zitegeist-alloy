var ApiService = require("api.services");
var TableRowBeacons = require("tableRows.beacons");

function ModalBeaconsComponent()
{
  Ti.API.info('ModalBeaconsComponent constructor');

  this.callback = null;
  this.beaconsAdded = [];
  this.provider = null;
  this.data = [];

  this.campaignBeaconLimit = 10;
}

ModalBeaconsComponent.prototype.createComponent = function(provider, data, callback)
{
  Ti.API.info('ModalBeaconsComponent created', provider, data, callback);

  _this = this;
  this.callback = callback;
  this.data = data;
  this.provider = provider;

  if (data.length > 0)
    this.beaconsAdded = data;

  var win = Ti.UI.createWindow(
  {
    backgroundColor: "#ebf0f3",//"#214f7e",
    top: 20,
    //layout: "vertical"
    //opacity: 0.90
  });

  var viewWrapper = Ti.UI.createView(
  {
    backgroundColor: "transparent",
    top: 0,
    left: 5,
    right: 5,
    layout: "vertical"
  });

  win.add(viewWrapper);

  /////////////////////////////////
  // Header
  /////////////////////////////////
  // var titleText = Ti.UI.createLabel(
  // {
  //   text: "Add Beacons",
  //   font: {fontSize: 24, fontFamily: "SFUIDisplay-Regular"},
  //   color: "#03a9f4",
  //   top: 0,
  //   left: 10,
  //   right: 10,
  //   textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
  // });

  /////////////////////////////////
  // TextBox & Button
  /////////////////////////////////
  var textView = Ti.UI.createView(
  {
    top: 5,
    height: Ti.UI.SIZE,
    layout: "horizontal",
    backgroundColor: "white",
    borderColor: "lightgray",
  });
  var searchIcon = Ti.UI.createImageView(
  {
    left: 5,
    width: 20,
    height: 20,
    image: "/images/search-icon-50.png"
  });
  var textBox = Ti.UI.createTextField(
  {
    left: 5,
    //width: config.deviceWidth - 100,
    right: 5,
    height: 40,
    paddingLeft: 5,
    paddingRight: 5,
    font: {fontSize: 14, fontFamily: "SFUIDisplay-Light"},
    hintText: "Search beacons",
    autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE
  });

  textBox.addEventListener("change", function(e)
  {
    Ti.API.info('textchange', e);

    if (e.value.length > 2)
    {
      _this.searchText(e.value, function(err, results)
      {
        if (err)
        {
          Ti.API.info('error', err);
          return;
        }

        Ti.API.info('got back results', results);
        var row;
        var rows = [];
        _.each(results, function(item)
        {
          // ignore already added beacons
          if (_.findWhere(_this.beaconsAdded, {_id:item._id}) === undefined)
          {
            row = new TableRowBeacons().createRow();
            row.title = item.name;
            row.data = item;
            rows.push(row);
          }
        });
        tableView.data = rows;
      });
    }
  });

  var totalLabel = Ti.UI.createLabel(
  {
    width: "50%",
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
    font: {fontSize: 12, fontFamily: "SFUIDisplay-Medium"},
    color: "#e9f5c0",
    text: "Added " + _this.beaconsAdded.length + " of 10",
    borderColor: "black",
    height: Ti.UI.FILL
  });
  var editButton = Ti.UI.createButton(
  {
      title: "Edit Beacons",
      font: {fontSize: 12, fontFamily: "SFUIDisplay-Medium"},
      color: "#e9f5c0",
      width: "50%",
      borderColor: "black",
      height: Ti.UI.FILL
  });
  var editView = Ti.UI.createView(
  {
    top: 0,
    height: 30,
    width: "100%",
    layout: "horizontal",
    backgroundColor: "#03a9f4"
  });

  textView.add(searchIcon);
  textView.add(textBox);

  editView.add(totalLabel);
  editView.add(editButton);

  viewWrapper.add(textView);
  viewWrapper.add(editView);

  /////////////////////////////////
  // TableView & Row
  /////////////////////////////////
  var tableView = Ti.UI.createTableView(
  {
    top: 0,
    left: 0,
    right: 0,
    bottom: 60
  });

  viewWrapper.add(tableView);

  tableView.addEventListener("beaconAddEvent", function(e)
  {
    Ti.API.info('beaconAddEvent', e.beacon);

    // limit beacons (if provider is campaign)
    if (_this.provider === "campaign" && _this.beaconsAdded.length === _this.campaignBeaconLimit)
    {
      alert("Only " + _this.campaignBeaconLimit + " beacons are allowed.");
      return;
    }

    // add beacon
    _this.beaconsAdded.push(e.beacon);
    Ti.API.info('beacons added', _this.beaconsAdded);

    // update totals
    totalLabel.text = "Added " + _this.beaconsAdded.length + " of 10",
    // remove beacon from table
    //var index = _.indexOf(tableView.data, e.beacon);
    Ti.API.info('removing index', e.index);
    tableView.deleteRow(e.index);
  });
  // tableView.addEventListener("beaconRemoveEvent", function(e)
  // {
  //   Ti.API.info('beaconRemoveEvent', e);
  // });
  /////////////////////////////////
  // Buttons
  /////////////////////////////////
  var doneButton = Ti.UI.createButton(
  {
    width: (config.deviceWidth / 2) - 7,
    height: 50,
    title: "DONE",
    color: "white",
    backgroundColor: "#03a9f4",
    font: {fontSize: 16, fontFamily: "SFUIDisplay-Medium"},
    broderColor: "black",
    bottom: 5,
    left: 5
    //enabled: false
  });

  var cancelButton = Ti.UI.createButton(
  {
    width: (config.deviceWidth / 2) - 7,
    height: 50,
    title: "CANCEL",
    color: "white",
    backgroundColor: "#03a9f4",
    font: {fontSize: 16, fontFamily: "SFUIDisplay-Medium"},
    backgroundImage: 'none',
    boderColor: "black",
    bottom: 5,
    right: 5
  });

  doneButton.addEventListener("click", function(e)
  {
    Ti.API.info('done clicked');

    _this.callback(_this.beaconsAdded);

    win.close();
  });

  cancelButton.addEventListener("click", function(e)
  {
    Ti.API.info('cancel clicked');
    win.close();
  });

  /////////////////////////////////
  //win.add(titleText);
  //win.add(picker);
  win.add(doneButton);
  win.add(cancelButton);

  // set default row
  //picker.setSelectedRow(0, startIndex, false);

  win.open({animate:true});
};

ModalBeaconsComponent.prototype.searchText = function(text, callback)
{
  Ti.API.info('searching text', text);

  new ApiService().api("get", "beacons/search/" + text, {}, function(err, jsonResponse)
  {
    if (err)
    {
      //Ti.API.info('error', err);
      return callback(err, null);
      //$.tableview.data = lastdata;
    }
    else
    {
      //Ti.API.info('success', jsonResponse);
      return callback(null, jsonResponse);
    }
  });

};

module.exports = ModalBeaconsComponent;
