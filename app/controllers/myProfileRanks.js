var UserHelper = require('helpers-users');
var ApiService = require('api.services');

getFollowers();

function postLayoutHandler(e)
{
  Ti.API.info('postLayoutHandler', e);
}

function setRankLabels()
{
  var ranks = new UserHelper().userBrandRanks();
  Ti.API.info('got ranks', ranks);

  $.bronzeLabel.text = ranks.rank1;
  $.silverLabel.text = ranks.rank2;
  $.goldLabel.text = ranks.rank3;
  $.obsidianLabel.text = ranks.rank4;
}

function getFollowers()
{
  Ti.API.info('getting followers');
  var user = new UserHelper().getUser();
  Ti.API.info('userVO', user);
  var id = user.brand._id;// //userBrand._id;
  new ApiService().api("get", "brandFollows/ranked/counts/?brand=" + id, {}, function(err, jsonResponse)
  {
    if (err)
    {
      Ti.API.info('error', err);
      //campaignListView.data = lastdata;
    }
    else
    {
      Ti.API.info('success, your followers', jsonResponse);
      // set brandranks
      new UserHelper().userBrandRanks(jsonResponse);
      setRankLabels();
      //userBrand = jsonResponse;
      //return userBrand;
      //getUserBeacons();
      //new CampaignHelper().setter(jsonResponse);
      //Ti.API.info('campaigns', new CampaignHelper().getCampaigns());
      //campaignListView.addCampaignsFromBeacons(jsonResponse);
    }
  });
}
