function ModalTextAreaComponent()
{
  Ti.API.info('ModalTextAreaComponent constructor');

  this.callback = null;
  this.selectedRow = null;
}

ModalTextAreaComponent.prototype.createComponent = function(data, header, callback)
{
  Ti.API.info('ModalTextAreaComponent created', data, header, callback);

  _this = this;
  this.callback = callback;

  if (data === "[Tap to enter text]") data = "";

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
  // TextArea
  /////////////////////////////////
  var textArea = Ti.UI.createTextArea(
  {
    top: 100,
    //width: Ti.UI.FILL,
    left: 15,
    right: 15,
    value: data,
    backgroundColor: "white",
    height: "50%",//150,//Ti.UI.SIZE,
    borderColor: "black",
    borderRadius: 5,
    hintText: "Enter description here",
    font: {fontSize: 18, fontFamily: "SFUIDisplay-Regular"},

  });

  textArea.addEventListener("change", function(e)
  {
    Ti.API.info('text changed', e);
    //_this.selectedRow = e;
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
    Ti.API.info('done clicked', e);

    //var row = picker.getSelectedRow(0);
    _this.callback(textArea.value);
    win.close();
  });

  cancelButton.addEventListener("click", function(e)
  {
    Ti.API.info('cancel clicked');
    win.close();
  });

  /////////////////////////////////
  win.add(titleText);
  win.add(textArea);
  win.add(doneButton);
  win.add(cancelButton);

  // set default row
  //picker.setSelectedRow(0, startIndex, false);

  win.open({animate:true});
};

module.exports = ModalTextAreaComponent;
