var UserHelper = require('helpers-users');
var ApiService = require('api.services');

//this.user = new UserHelper().getUser();
//Ti.API.info('user', this.user);
getUserBrand();

function postLayoutHandler(e)
{
  Ti.API.info('myProfile postLayoutHandler', e);
}

function getUserBrand()
{
  var user = config.user;

  Ti.API.info('getting user brand', user.brand);

  new ApiService().api("get", "brands/" + user.brand, {}, function(err, jsonResponse)
  {
    if (err)
    {
      Ti.API.info('error', err);
      //campaignListView.data = lastdata;
    }
    else
    {
      Ti.API.info('success', jsonResponse);
      //getUserBeacons();
      //new CampaignHelper().setter(jsonResponse);
      //Ti.API.info('campaigns', new CampaignHelper().getCampaigns());
      //campaignListView.addCampaignsFromBeacons(jsonResponse);
    }
  });
}

function beaconsClickHandler(e)
{
  getUserBeacons();
}

function getUserBeacons()
{
  var user = config.user;
  Ti.API.info('getUserBeacons');

  new UserHelper().getUserBeacons(function(results)
  {
    Ti.API.info('getUserBeacons results', results);
    _.each(results, function(item)
    {
      Ti.API.info('::', item.beacon);
      //ids.push(item.beacon._id);
    });
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
