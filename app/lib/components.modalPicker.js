function ModalPickerComponent()
{
  Ti.API.info('ModalPickerComponent constructor');

  this.callback = null;
  this.selectedRow = null;
}

ModalPickerComponent.prototype.createComponent = function(data, header, startIndex, callback)
{
  Ti.API.info('ModalPickerComponent created', data, callback);

  _this = this;
  this.callback = callback;
  this.startIndex = startIndex;

  var win = Ti.UI.createWindow(
  {
    backgroundColor: "#214f7e",
    top: 22
    //opacity: 0.90
  });

  /////////////////////////////////
  // Header
  /////////////////////////////////
  var titleText = Ti.UI.createLabel(
  {
    text: header,
    font: {fontSize: 24, fontFamily: "SFUIDisplay-Regular"},
    color: "#03a9f4",
    top: 50,
    left: 10,
    right: 10,
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
  });
  /////////////////////////////////
  // Picker
  /////////////////////////////////
  var picker = Ti.UI.createPicker(
  {
    top: 100,
    width: Ti.UI.FILL,
    height: Ti.UI.SIZE,
    backgroundColor: "#214f7e"
  });

  picker.addEventListener("change", function(e)
  {
    Ti.API.info('picker changed', e);
    _this.selectedRow = e;
  });

  var rows = [];
  var label;

  // add 'select'
  _.each(data, function(row)
  {
    Ti.API.info('row', row);

    label = Ti.UI.createLabel(
    {
      text: row.title,
      width: Ti.UI.FILL,
      color: "white",
      font: {fontSize: 24, fontFamily: "SFUIDisplay-Regular"},
      textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
    });
    var newrow = Ti.UI.createPickerRow({data:row});
    newrow.add(label);
    rows.push(newrow);
  });

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
    Ti.API.info('done clicked', e, _this.selectedRow.rowIndex);

    var row = picker.getSelectedRow(0);
    _this.callback(row.data);
    win.close();
  });

  cancelButton.addEventListener("click", function(e)
  {
    Ti.API.info('cancel clicked');
    win.close();
  });

  /////////////////////////////////
  picker.add(rows);
  picker.selectionIndicator = true;

  win.add(titleText);
  win.add(picker);
  win.add(doneButton);
  win.add(cancelButton);

  // set default row
  picker.setSelectedRow(0, startIndex, false);

  win.open({animate:true});
};

module.exports = ModalPickerComponent;
