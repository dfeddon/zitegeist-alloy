var UserHelper = require('helpers-users');
var RankProgressionComponent = require('component.rankProgression');

var firstLoad = true;
var brand = config.navigation.data;
var isFollowing = false;

Ti.API.info('config.nav.data', config.navigation.data);

function postLayoutHandler(e)
{
  Ti.API.info('postLayoutHandler', e);

  if (firstLoad === true)
  {
    firstLoad = false;
    isFollowing = new UserHelper().isFollowing(brand._id);
    Ti.API.info('following?', isFollowing, 'brand', brand);

    // add rank components
    var bronze = new RankProgressionComponent().createView("bronze");
    var silver = new RankProgressionComponent().createView("silver");
    var gold = new RankProgressionComponent().createView("gold");
    var obsidian = new RankProgressionComponent().createView("obsidian");

    $.bronzeView.add(bronze);
    $.silverView.add(silver);
    $.goldView.add(gold);
    $.obsidianView.add(obsidian);
  }
}
