var ModalTextAreaComponent = require("component.modalTextArea");

function MetricItemDesigner()
{
  Ti.API.info('MetricItemDesigner constructor');

  this.checked = false;
}

MetricItemDesigner.prototype.createRow = function()
{
  var _this = this;

  var tableViewRow = Ti.UI.createTableViewRow(
  {
    touchEnabled: true,
    bubbleParent: true,
    left: 10,
    right: 10,
    height: Ti.UI.SIZE
    //backgroundColor: "#eef7fa",
    //borderColor: "#eef7fa",
    //borderRadius: 5
  });

  var labelText = Ti.UI.createLabel(
  {
    id: "labelText",
    top: 5,
    bottom: 5,
    left: 20,
    right: 20,
    height: Ti.UI.SIZE,
    wordWrap: true,
    text: "[Tap to enter text]",
    font: {fontSize: 14, fontFamily: "SFUIDisplay-Light"}
    //tintColor: "gray",
    //title: "Edit"
    //image: "/images/checkmark_icon-50.png"
  });

  tableViewRow.add(labelText);

  // events
  tableViewRow.addEventListener("click", touchedHandler);

  function touchedHandler(e)
  {
    Ti.API.info('click', e);

    new ModalTextAreaComponent().createComponent(labelText.text,"Item Text",function(text)
    {
      Ti.API.info('textchanged', text);
      labelText.text = text;
      tableViewRow.fireEvent("rowChangeEvent", { row: tableViewRow, bubbles: true});
    });
  }

  return tableViewRow;
};

module.exports = MetricItemDesigner;
