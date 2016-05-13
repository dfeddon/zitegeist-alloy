var ApiService = require("api.services");
var config = require("singleton-config");
var beacon = require("models-beacons");

//var beaconIds = [];

function signin(e)
{
  Ti.API.info('sign in...');

  $.container.fireEvent("navChangeEvent", {from:"onboardSplash", to:"signin"});
}

function register(e)
{
  Ti.API.info('register...');
}

//$.container.addEventListener("beaconChangeEvent", beaconChangeHandler);

// function beaconChangeHandler(e)
// {
//   Ti.API.info('beacon change handler', e);
//   Ti.API.info(JSON.stringify(e.beacon));
//   e.cancelBubble = true;
//   beaconIds.push(e.beacon._id);
//   Ti.API.info('beacon ids', beaconIds);
//
//   // search campaign for matching beacons
//   // /campaigns/beacons/search/:ids
//   new ApiService().api("get", "campaigns/beacons/search/" + beaconIds.toString(), {}, function(err, jsonResponse)
//   {
//     if (err)
//     {
//       Ti.API.info('error', err);
//       $.tableview.data = lastdata;
//     }
//     else
//     {
//       Ti.API.info('success');//, jsonResponse);
//       $.campaignListView.addCampaignsFromBeacons(jsonResponse);
//     }
//   });
// }

function searchButtonHandler(e)
{
  Ti.API.info('searching...');
  $.selector.left = 15;
  $.selector.right = undefined;

  $.answersView.visible = false;
  $.answersView.height = 0;
  $.answersView.width = 0;

  $.questionsView.visible = true;
  $.questionsView.width = Ti.UI.SIZE;
  $.questionsView.height = Ti.UI.SIZE;
}

function createButtonHandler(e)
{
  Ti.API.info('creating...');
  //$.selector.left = "50%";
  $.selector.right = 15;
  $.selector.left = undefined;

  $.questionsView.visible = false;
  $.questionsView.width = 0;
  $.questionsView.height = 0;

  $.answersView.visible = true;
  $.answersView.width = Ti.UI.SIZE;
  $.answersView.height = Ti.UI.SIZE;
}
