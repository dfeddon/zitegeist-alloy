var ViewHelper = require("helpers.view");
var ModalPickerComponent = require("components.modalPicker");
var ModalBeaconsComponent = require("components.modalBeacons");
var CampaignsModel = require('models-campaigns');

var firstRun = false;
var toggleBoolean = false;

var engagementMethodIndex = 0;
var demoAgeIndex = 0;
var demoGenderIndex = 0;
var rewardsTypeIndex = 0;

var campaignVO = new CampaignsModel();//.setter();
Ti.API.info('vo', campaignVO);//.getter());

//new ViewHelper().hideElement($.addBeacons);

function postLayoutHandler(e)
{
  Ti.API.info('campaignBuilderHandler');

  if (firstRun === false)
  {
    firstRun = true;
    init();
  }
  //advancedToggle(false);
}

function init()
{
  Ti.API.info('init!');
  // if (campaignVO.engagement.type === "beacons")
  // {
  //   Ti.API.info('beacons...');
  //   if (campaignVO.engagement.beacons.length === 0)
  //   {
  //     //campaignVO.engagement.beacons.push("Tap to add...");
  //     //updateBeaconCloud();
  //   }
  // }
  engagementSubviewsManager();
  rewardsSubviewsManager();
}

function engagementSubviewsManager()
{
  var view = new ViewHelper();

  switch(campaignVO.engagement.type)
  {
    case "beacons":
      view.hideElement($.methodRanked);
      view.showElement($.methodBeacons);
    break;

    case "ranked":
    view.hideElement($.methodBeacons);
    view.showElement($.methodRanked);
    break;

    case "friends":
    break;

    case "global":
    break;
  }
}

function rewardsSubviewsManager()
{
  Ti.API.info('rewardsSubviewsManager', campaignVO.reward.type);
  var view = new ViewHelper();

  switch(campaignVO.reward.type)
  {
    case "none":
      view.hideElement($.rewardsCouponView);
      view.hideElement($.rewardsCreditsView);
    break;

    case "credits":
      view.hideElement($.rewardsCouponView);
      view.showElement($.rewardsCreditsView);
    break;

    case "coupon":
      view.hideElement($.rewardsCreditsView);
      view.showElement($.rewardsCouponView);
    break;
  }
}

function addBeacons()
{
  new ModalBeaconsComponent().createComponent("campaign", campaignVO.engagement.beacons, beaconsAddedHandler);
}

function beaconsAddedHandler(beacons)
{
  Ti.API.info('beaconsAddedHandler', beacons);

  campaignVO.engagement.beacons = beacons;
  updateBeaconCloud();
}

function rankedChangeHandler(e)
{
  Ti.API.info('rankedChangeHandler', e.source.id);

  var index;
  switch(e.source.id)
  {
    case "bronzeButton":
      if (_.contains(campaignVO.engagement.ranks, "bronze"))
      {
        index = _.indexOf(campaignVO.engagement.ranks, "bronze");
        campaignVO.engagement.ranks.splice(index, 1);
        e.source.backgroundColor = "#eef7fa";
      }
      else
      {
        campaignVO.engagement.ranks.push("bronze");
        e.source.backgroundColor = "#cd7f32";
      }
    break;

    case "silverButton":
      if (_.contains(campaignVO.engagement.ranks, "silver"))
      {
        index = _.indexOf(campaignVO.engagement.ranks, "silver");
        campaignVO.engagement.ranks.splice(index, 1);
        e.source.backgroundColor = "#eef7fa";
      }
      else
      {
        campaignVO.engagement.ranks.push("silver");
        e.source.backgroundColor = "#C9D1D3";
      }
    break;

    case "goldButton":
      if (_.contains(campaignVO.engagement.ranks, "gold"))
      {
        index = _.indexOf(campaignVO.engagement.ranks, "gold");
        campaignVO.engagement.ranks.splice(index, 1);
        e.source.backgroundColor = "#eef7fa";
      }
      else
      {
        campaignVO.engagement.ranks.push("gold");
        e.source.backgroundColor = "#EEBC1D";
      }
    break;

    case "obsidianButton":
    if (_.contains(campaignVO.engagement.ranks, "obsidian"))
    {
      index = _.indexOf(campaignVO.engagement.ranks, "obsidian");
      campaignVO.engagement.ranks.splice(index, 1);
      e.source.backgroundColor = "#eef7fa";
    }
    else
    {
      campaignVO.engagement.ranks.push("obsidian");
      e.source.backgroundColor = "#000033";
    }
    break;
  }
  Ti.API.info('ranks', campaignVO.engagement.ranks);
}

function changeAudienceHandler(e)
{
  Ti.API.info('changeAudienceHandler', e);
  var rows = [
    { title:"Beacons", value:"beacons", index:0},
    { title:"Ranked Members", value:"ranked", index:1},
    { title:"My Friends", value:"friends", index:2},
    { title:"Global", value:"global", index:3}
  ];
  // get currently selected index
  //switch()
  new ModalPickerComponent().createComponent(rows, "Audience Type", engagementMethodIndex, audienceSelectedHandler);
}

function audienceSelectedHandler(e)
{
  Ti.API.info('audienceSelectedHandler', e);
  // set button text and index
  $.audienceMethod.title = e.title;
  engagementMethodIndex = e.index;
  // update vo
  campaignVO.engagement.type = e.value;
  Ti.API.info('vo',campaignVO);

  if (e.value === "beacons")
  {
    updateBeaconCloud();
  }

  engagementSubviewsManager();
}

function updateBeaconCloud()
{
  Ti.API.info('updating beacon cloud', campaignVO.engagement.beacons);

  if (campaignVO.engagement.beacons.length > 0)
  {
    // hide tapBeaconsButton
    //$.tapBeaconsButton.hide();
  }
  else
  {
    // show tapBeaconsButton
    //$.tapBeaconsButton.show();
  }

  // first, clear extant items
  _.each($.beaconTags.children, function(beacon)
  {
    $.beaconTags.remove(beacon);
  });

  // add new items
  var label;
  _.each(campaignVO.engagement.beacons, function(beacon)
  {
    label = $.UI.create('TextField', {value:beacon.name, classes:["beaconCloudItem"]});
    $.beaconTags.add(label);
  });
}

function changeDemoGenderHandler(e)
{
  Ti.API.info('changeDemoGenderHandler', e);
  var rows = [
    { title:"Any", value:"any", index:0},
    { title:"Male", value:"male", index:1},
    { title:"Female", value:"female", index:2}
  ];
  // get currently selected index
  //switch()
  new ModalPickerComponent().createComponent(rows, "Gender", demoGenderIndex, demoGenderSelectedHandler);
}

function changeDemoAgeHandler(e)
{
  Ti.API.info('changeDemoAgeHandler', e);
  var rows = [
    { title:"21 and Under", value:"21u", index:0},
    { title:"22 - 34", value:"22-34", index:1},
    { title:"35 - 44", value:"35-44", index:2},
    { title:"45 - 54", value:"45-54", index:3},
    { title:"55 - 64", value:"55-64", index:4},
    { title:"65 and Over", value:"65o", index:5}
  ];
  // get currently selected index
  //switch()
  new ModalPickerComponent().createComponent(rows, "Age", demoAgeIndex, demoAgeSelectedHandler);
}

// function changeDemoLocaleHandler(e)
// {
//   Ti.API.info('changeDemoLocaleHandler', e);
//   var rows = [
//     { title:"Beacons", value:"beacons", index:0},
//     { title:"Ranked Members", value:"ranked", index:1},
//     { title:"My Friends", value:"friends", index:2},
//     { title:"Global", value:"global", index:3}
//   ];
//   // get currently selected index
//   //switch()
//   new ModalPickerComponent().createComponent(rows, "Locale", engagementMethodIndex, audienceSelectedHandler);
// }

function demoGenderSelectedHandler(e)
{
  $.demoGender.title = e.title;
  demoGenderIndex = e.index;

  // update vo
  //campaignVO.engagement.type = e.value;
}

function demoAgeSelectedHandler(e)
{
  $.demoAge.title = e.title;
  demoAgeIndex = e.index;

  // update vo
  //campaignVO.engagement.type = e.value;
}

function changeRewardsTypeHandler(e)
{
  Ti.API.info('changeRewardsTypeHandler', e);
  var rows = [
    { title:"None", value:"none", index:0},
    { title:"Credits", value:"credits", index:1},
    { title:"Coupon Code", value:"coupon", index:2}
  ];
  // get currently selected index
  //switch()
  new ModalPickerComponent().createComponent(rows, "Reward Type", rewardsTypeIndex, rewardsTypeSelectedHandler);
}

function rewardsTypeSelectedHandler(e)
{
  $.rewardsType.title = e.title;
  rewardsTypeIndex = e.index;

  // update vo
  campaignVO.reward.type = e.value;

  // update subviews
  rewardsSubviewsManager();
}


//////////////////////////////

exports.advancedToggleBool = function(bool)
{
  Ti.API.info('advancedToggleBool', bool);
  if (bool == null) bool = false;

  advancedToggle(bool);
};

function advancedToggle(bool)
{
  Ti.API.info('advancedToggle', bool);
  if (bool == null) bool = false;

  if (bool === false)
  {
    _.each($.scrollView.children, function(child)
    {
      Ti.API.info('child', child);
      if (child.isAdvanced && child.isAdvanced === true)
        hideAdvanced(child);
      _.each(child.children, function(subchild)
      {
        Ti.API.info('subchild', subchild);
        if (subchild.isAdvanced && subchild.isAdvanced === true)
          hideAdvanced(subchild);
        _.each(subchild.children, function(subchild2)
        {
          Ti.API.info('subchild2', subchild2);
          if (subchild2.isAdvanced && subchild2.isAdvanced === true)
            hideAdvanced(subchild2);
        });
      });
    });

    $.scrollView.layout = "vertical";
  }
}

function hideAdvanced(view)
{
  Ti.API.info('hiding', view);
  view.hide();
  //view.parent.remove(view);
  //view = null;

  /*view.top = undefined;
  view.height = 0;
  view.width = 0;*/
}
