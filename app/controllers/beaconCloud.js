function viewLayoutHandler(e)
{
  Ti.API.info('beaconCloud layout!');
}

exports.addBeaconToCloud = function(beacon)
{
  Ti.API.info('adding beacon to cloud', beacon.name);

  var textView = $.UI.create('View',
  {
    bottom: 5,
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE
  });

  var text = $.UI.create('TextField',
  {
    value: beacon.name,
    //width: 200
  });

  textView.add(text);
  $.view.add(textView);
  Ti.API.info(':', text, textView, $.view.children.length);

  // dispatch beacon change event
  $.view.fireEvent("beaconChangeEvent", {beacon: beacon});
};
