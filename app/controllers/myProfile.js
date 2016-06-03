var UserHelper = require('helpers-users');
var ModelBrands = require('models.brands');
//var ViewHelper = require('helpers.view');
var ApiService = require('api.services');

//this.user = new UserHelper().getUser();
//Ti.API.info('user', this.user);
var firstLoad = false;
var currentView, addBeaconToCloud, loadedBeacons;

var userBrand = getUserBrand();

$.contentWrapper.addEventListener("myProfileViewChange", myProfileViewChangeHandler);
$.contentWrapper.addEventListener("beaconCloudCreated", beaconCloudCreatedHandler);

function postLayoutHandler(e)
{
  Ti.API.info('myProfile postLayoutHandler', e);
  if (firstLoad === false)
  {
    firstLoad = true;
    //$.contentWrapper.fireEvent("myProfileViewChange", {view:"campaignStreams"});
  }
}

function beaconCloudCreatedHandler(e)
{
  Ti.API.info("beaconCloudCreatedHandler", e.addBeaconToCloud, loadedBeacons);

  // assign local reference to addBeaconToCloud
  addBeaconToCloud = e.addBeaconToCloud;

  // if beacons are loaded, add them
  // otherwise, wait until we receive the data (see myProfileViewChangeHandler below)
  if (loadedBeacons != null)
  {
    _.each(loadedBeacons, function(beacon)
    {
      addBeaconToCloud(beacon, true);
    });
  }
}

function myProfileViewChangeHandler(e)
{
  Ti.API.info('got view change', e);

  // cancel bubbling
  e.cancelBubble = true;

  // remove extant view (if exists)
  if (currentView != null)
    $.contentWrapper.remove(currentView);

  // create new view
  currentView = Alloy.createController(e.view).getView();

  // add to wrapper
  $.contentWrapper.add(currentView);

  switch(e.view)
  {
    case "beaconsTextField":
      // if beaconCloud function loaded, add beacons
      // otherwise, assign reference to loaded beacons (see beaconCloudCreatedHandler above)
      if (addBeaconToCloud != null)
      {
        _.each(e.beacons, function(beacon)
        {
          addBeaconToCloud(beacon);
        });
      }
      else loadedBeacons = e.beacons;
    break;
  }
}

function getUserBrand()
{
  var user = config.user;

  Ti.API.info('getting user brand', user.brand);

  var brandId = user.brand;
  if (user.brand._id != null)
    brandId = user.brand._id;

  new ApiService().api("get", "brands/" + brandId, {}, function(err, jsonResponse)
  {
    if (err)
    {
      Ti.API.info('error', err);
      //campaignListView.data = lastdata;
    }
    else
    {
      Ti.API.info('success', jsonResponse);
      var brandVO = new ModelBrands().setter(jsonResponse);
      user.brand = brandVO;// jsonResponse;
      user.setter();
      Ti.API.info('userVO', user);
      userBrand = brandVO;//jsonResponse;

      getCampaigns();

      return userBrand;
      //getUserBeacons();
      //new CampaignHelper().setter(jsonResponse);
      //Ti.API.info('campaigns', new CampaignHelper().getCampaigns());
      //campaignListView.addCampaignsFromBeacons(jsonResponse);
    }
  });
}

function buttonsReset(source)
{
  $.campaigns.backgroundColor = "#2C3E50";
  $.campaigns.color = "white";
  $.zeitgeist.backgroundColor = "#2C3E50";
  $.zeitgeist.color = "white";
  $.ranks.backgroundColor = "#2C3E50";
  $.ranks.color = "white";
  $.beacons.backgroundColor = "#2C3E50";
  $.beacons.color = "white";
}
function beaconsClickHandler(e)
{
  getUserBeacons();
  buttonsReset();

  $.beacons.backgroundColor = "black";
  $.beacons.color = "white";
}

function ranksClickHandler(e)
{
  getRanks();
  //getFollowers();
  buttonsReset();

  $.ranks.backgroundColor = "black";
  $.ranks.color = "white";
}

function campaignsClickHandler(e)
{
  getCampaigns();
  buttonsReset();

  $.campaigns.backgroundColor = "black";
  $.campaigns.color = "white";
}

function zeitgeistClickHandler(e)
{
  getZScore();
  buttonsReset();

  $.zeitgeist.backgroundColor = "black";
  $.zeitgeist.color = "white";
}

function getZScore()
{
  $.contentWrapper.fireEvent("myProfileViewChange", {view:"myProfileZScore"});
}

function getRanks()
{
  $.contentWrapper.fireEvent("myProfileViewChange", {view:"myProfileRanks"});
}

function getCampaigns()
{
  $.contentWrapper.fireEvent("myProfileViewChange", {view:"campaignStreams"});
}

function getUserBeacons()
{
  Ti.API.info('getUserBeacons');

  var user = config.user;
  var beaconsArray = [];

  new UserHelper().getUserBeacons(function(results)
  {
    Ti.API.info('getUserBeacons results', results);

    _.each(results, function(item)
    {
      Ti.API.info('::', item.beacon);
      beaconsArray.push(item.beacon);
    });

    $.contentWrapper.fireEvent("myProfileViewChange", {view:"beaconsTextField", beacons: beaconsArray});
  });

  // new ApiService().api("get", "users/beacons/" + user._id, {}, function(err, jsonResponse)
  // {
  //   if (err)
  //   {
  //     Ti.API.info('error', err);
  //     //campaignListView.data = lastdata;
  //   }
  //   else
  //   {
  //     Ti.API.info('success', jsonResponse);
  //   }
  // });
}
