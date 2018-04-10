var ModelBeacons = require('models-beacons');
var ModelUserBeacons = require('models-userBeacons');
var BeaconHelper = require('helpers-beacons');

var firstLoad = false;
//var beaconCloudArray = [];

function viewLayoutHandler(e)
{
  Ti.API.info('beaconCloud layout!');
  if (firstLoad === false)
  {
    $.view.fireEvent("beaconCloudCreated", {addBeaconToCloud: exports.addBeaconToCloud, bubbles: true});
    firstLoad = true;
  }
}

exports.addBeaconToCloud = function(beacon, init)
{
  if (init == null) init = false;

  // sanitize beacon
  Ti.API.info('beacon', beacon, init);
  var model = new ModelBeacons().setter(beacon);
  Ti.API.info('model', model);
  beacon = model.getter();
  Ti.API.info('sanitized', beacon);

  // avoid duplicates
  //if (_.findWhere(new BeaconHelper().localBeaconIds, beacon._id))
  if (new BeaconHelper().userBeaconExistsById(beacon._id) === true && init===false)
  {
    Ti.API.info('duplicate', beacon, 'getting out!');
    return;
  }
  else if (init===false)
  {
    // add to array
    Ti.API.info('beaconCloud addUserBeacon', beacon);
    var userBeacon = new ModelUserBeacons().setter();
    userBeacon.beacon = beacon._id;
    config.user.beacons.push(userBeacon.getter());
    //new BeaconHelper().addUserBeacon(beacon);
  }

  //beacon.
  Ti.API.info('adding beacon to cloud', beacon.name, JSON.stringify(beacon));

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
  //Ti.API.info(':', text, textView, $.view.children.length);

  // dispatch beacon change event
  if (init === false)
    config.views.index.fireEvent("beaconAddEvent", { beacon: beacon, bubbles: true});
};

function beaconClickHandler(e)
{
  Ti.API.info('beacon clicked', e.source.value);
  Ti.API.info('parent', e.source.parent);

  // initiate a bottom-based menu to delete the beacon
  $.view.fireEvent("beaconClickEvent", { name: e.source.value, view: e.source.parent, bubbles: true});
}
