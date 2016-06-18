function TableRowBeacons()
{
  Ti.API.info('TableRowBeacons constructor');

  this.checked = false;
}

TableRowBeacons.prototype.createRow = function()
{
  var _this = this;

  var tableViewRow = Ti.UI.createTableViewRow(
  {
    touchEnabled: true,
    bubbleParent: true,
    left: 0,
    right: 0,
    height: 40,
    font: {fontSize: 14, fontFamily: "SFUIDisplay-Regular"}
  });

  // var checkmark = Ti.UI.createButton(
  // {
  //   right: 10,
  //   width: 25,
  //   height: 25,
  //   tintColor: "gray",
  //   image: "/images/checkmark_icon-50.png"
  // });

  var confirmButton = Ti.UI.createButton(
  {
    id: "confirmButton",
    touchEnabled: false,
    color: "white",
    // width: 20,
    // height: 20,
    //tintColor: "green",
    //image: "/images/checkmark_icon-50.png"
    title: "CONFIRM",
    font: {fontSize: 12, fontFamily: "SFUIDisplay-Regular"}
  });
  var cancelButton = Ti.UI.createButton(
  {
    //color: "white"
    id: "cancelButton",
    width: 20,
    height: 20,
    tintColor: "white",
    image: "/images/delete_icon-50.png"
    //title: "CONFIRM"
  });
  var confirmView = Ti.UI.createView(
  {
    id: "confirmView",
    right: 40,
    width: 75,
    height: 40,
    backgroundColor: "#26601f"
  });
  var cancelView = Ti.UI.createView(
  {
    id: "cancelView",
    right: 0,
    width: 40,
    height: 40,
    backgroundColor: "red"
  });

  confirmView.add(confirmButton);
  cancelView.add(cancelButton);
  //tableViewRow.add(checkmark);

  // events
  tableViewRow.addEventListener("click", touchedHandler);
  confirmView.addEventListener("click", touchedHandler);
  cancelView.addEventListener("click", touchedHandler);

  function touchedHandler(e)
  {
    Ti.API.info('click', e);
    if (_this.checked === false)
    {
      // change image to green
      //checkmark.tintColor = "green";
      tableViewRow.add(cancelView);
      tableViewRow.add(confirmView);
      tableViewRow.backgroundColor = "#2b5e93";
      tableViewRow.color = "white";

      _this.checked = true;
    }
    else
    {
      if (e.source.id == "confirmView" || e.source.id == "confirmButton")
      {
        // add beacon
        Ti.API.info('add beacon confirmed', e.index);
        tableViewRow.fireEvent("beaconAddEvent", {beacon: tableViewRow.data, index: e.index});
      }
      else
      {
        // cancel beacon
        // change image back to blue
        //checkmark.tintColor = "gray";
        tableViewRow.remove(cancelView);
        tableViewRow.remove(confirmView);
        tableViewRow.backgroundColor = "white";
        tableViewRow.color = "black";
        //tableViewRow.fireEvent("beaconRemoveEvent", {beacon: tableViewRow.data});
      }
      _this.checked = false;
    }
  }

  return tableViewRow;
};

module.exports = TableRowBeacons;
