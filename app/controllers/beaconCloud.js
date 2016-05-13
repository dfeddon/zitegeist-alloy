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

  textView.addEventListener("click", beaconClickHandler);

  var text = $.UI.create('TextField',
  {
    value: beacon.name,
    //width: 200
  });

  textView.add(text);
  $.view.add(textView);
  Ti.API.info(':', text, textView, $.view.children.length);

  // dispatch beacon change event
  $.view.fireEvent("beaconAddEvent", {beacon: beacon});
};

function beaconClickHandler(e)
{
  Ti.API.info('beacon clicked', e.source.value);
  Ti.API.info('parent', e.source.parent);

  // initiate a bottom-based menu to delete the beacon
  $.view.fireEvent("beaconClickEvent", {name:e.source.value, view:e.source.parent});
}
