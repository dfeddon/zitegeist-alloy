var config = require("singleton-config");
var UserHelper = require("helpers-users");

var brand = config.navigation.data;
var currentView;
var firstLoad = false;
var isFollowing = new UserHelper().isFollowing(brand._id);

Ti.API.info('brand', brand, isFollowing);
$.displayName.text = brand.owner.displayName;
$.username.text = "@" + brand.owner.username;
Ti.API.info('user profile image', brand.owner.image);
$.image.image = (brand.owner.image) ? brand.owner.image : 'https://s3.amazonaws.com/zeitgeist-media/users/icon-user.png';

function postLayoutHandler(e)
{
  Ti.API.info('userProfile postLayoutHandler');
  if (firstLoad === false)
  {
    firstLoad = true;

    if (isFollowing === true)
    {
      $.joinButton.title = "UNJOIN";
      $.joinButton.backgroundColor = "red";
      $.ranks.title = "Your Rank";
    }

    getCampaigns();
  }
}

$.contentWrapper.addEventListener("myProfileViewChange", myProfileViewChangeHandler);

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

  // switch(e.view)
  // {
  //   case "beaconsTextField":
  //     // if beaconCloud function loaded, add beacons
  //     // otherwise, assign reference to loaded beacons (see beaconCloudCreatedHandler above)
  //     if (addBeaconToCloud != null)
  //     {
  //       _.each(e.beacons, function(beacon)
  //       {
  //         addBeaconToCloud(beacon);
  //       });
  //     }
  //     else loadedBeacons = e.beacons;
  //   break;
  // }
}

function buttonsReset(source)
{
  $.campaigns.backgroundColor = "#2C3E50";
  $.campaigns.color = "white";
  $.fame.backgroundColor = "#2C3E50";
  $.fame.color = "white";
  $.ranks.backgroundColor = "#2C3E50";
  $.ranks.color = "white";
  //$.beacons.backgroundColor = "#2C3E50";
  //$.beacons.color = "white";
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

function fameClickHandler(e)
{
  getFame();
  buttonsReset();

  $.fame.backgroundColor = "black";
  $.fame.color = "white";
}

function getFame()
{
  $.contentWrapper.fireEvent("myProfileViewChange", {view:"userProfileFame"});
}

function getRanks()
{
  $.contentWrapper.fireEvent("myProfileViewChange", {view:"userProfileRanks"});
}

function getCampaigns()
{
  $.contentWrapper.fireEvent("myProfileViewChange", {view:"campaignStreams"});
}
