var config = require("singleton-config");
var ModelUsers = require("models-users");
var UserHelper = require("helpers-users");
var CampaignHelper = require("helpers-campaigns");
var ViewHelper = require("helpers.view");
var ApiService = require("api.services");

var TRUE_TOP = 20;
var NAVIGATION_HEIGHT = 40;
var WRAPPER_TOP = TRUE_TOP + NAVIGATION_HEIGHT;

var currentView, modalView;
var viewFrom, viewTo, fromModal, toModal;
var campaignListView;
var beaconClicked;

function openHandler(e)
{
    Ti.API.info('opened!', Ti.App.Properties.getString('isRegistered'));
    if (Ti.App.Properties.getString('isRegistered') === "true")
    {
        Ti.API.info('login...');
        $.contentWrapper.fireEvent("navChangeEvent", {from:null, to:"signin"});
    }
    else
    {
        Ti.API.info('new user, registering...');

        // create unwired user obj
        var user = new ModelUsers().setter();
        Ti.API.info('reguser', user.getter());

        // get onboarding splash view
        currentView = Alloy.createController('onboardSplash').getView();
        $.contentWrapper.add(currentView);
    }
}

$.contentWrapper.addEventListener("navChangeEvent", navChangeEvent);
$.contentWrapper.addEventListener("beaconClickEvent", beaconClickHandler);
$.contentWrapper.addEventListener("campaignListCreated", campaignListCreatedHandler);
$.contentWrapper.addEventListener("beaconAddEvent", beaconAddHandler);

function beaconAddHandler(e)
{
  Ti.API.info('beacon add handler', e);
  Ti.API.info(JSON.stringify(e.beacon));

  // cancel event
  e.cancelBubble = true;

  // add beacon id to user beacons
  var user = new UserHelper().getUser();
  user.beacons.push(e.beacon._id);
  user.setter();

  Ti.API.info('beacon ids', user.beacons);

  // update user (async)
  //UserHelper.updateUser(user);

  // update campaigns
  refreshCampaignList();
}

function refreshCampaignList()
{
  Ti.API.info('refreshCampaignList');
  var beaconIds = new UserHelper().getUserBeaconIds();
  Ti.API.info('beaconIds', beaconIds.toString());
  // search campaign for matching beacons
  // /campaigns/beacons/search/:ids
  new ApiService().api("get", "campaigns/beacons/search/" + "5709236964c0c51739826745,570927f764c0c51739826747", {}, function(err, jsonResponse)
  {
    if (err)
    {
      Ti.API.info('error', err);
      //campaignListView.data = lastdata;
    }
    else
    {
      Ti.API.info('success', jsonResponse);
      new CampaignHelper().setter(jsonResponse);
      Ti.API.info('campaigns', new CampaignHelper().getCampaigns());
      //campaignListView.addCampaignsFromBeacons(jsonResponse);
    }
  });
}

function campaignListCreatedHandler(e)
{
    Ti.API.info('campaignListCreatedHandler (index)', e);

    campaignListView = e.source.campaignListView;

    // inject userBeacons into campaignList
    refreshCampaignList();
}

function beaconClickHandler(e)
{
    Ti.API.info('index got beacon click', e);

    // store event
    beaconClicked = e;

    $.footerLabel.text = "Remove beacon '" + e.name + "'?";
    $.footerAlert.animate(
    {
        bottom: 0,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN
    }, function()
    {
        Ti.API.info('animate done');
    });
}
function navChangeEvent(e)
{
    Ti.API.info('nav changed', e);

    viewFrom = e.from;
    viewTo = e.to;

    if (e.data) config.navigation.data = e.data;

    if (e.fromModal == null) e.fromModal = false;
    if (e.toModal == null) e.toModal = false;

    fromModal = e.fromModal;
    toModal = e.toModal;

    if (e.toModal === true && e.fromModal === false)
    {
      $.contentModal.show();
      $.contentWrapper.hide();
    }
    else if (e.toModal === false && e.fromModal === true)
    {
      $.contentModal.hide();
      $.contentWrapper.show();
    }

    if (e.toModal === false && e.fromModal === false)
    {
      // remove currentView
      if (currentView != null)
        $.contentWrapper.remove(currentView);
      // create new view
      currentView = Alloy.createController(e.to).getView();
      // add new view to wrapper
      $.contentWrapper.add(currentView);
    }
    else if (e.fromModal === true)
    {
      // just hide modal
      $.contentModal.remove($.contentModal.children[0].getView);
    }
    else
    {
      $.contentWrapper.hide();
      $.contentModal.show();
      modalView = Alloy.createController(e.to).getView();
      $.contentModal.add(modalView);
    }

    switch(e.from)
    {
        case "signin":
            if (e.to == "campaignStreams")
            {
              // navigation
              $.backButton.hide();// new ViewHelper().hideElement($.backButton);
              navBarToggle("on");
              footerBarToggle("on");
              // TODO: Also remove onboardSplash view
              var splash = $.contentWrapper.children.length;//.getView("onboardSplash");
              Ti.API.info('splash', splash);
              //$.contentWrapper.remove($.getView("onboardSplash"));
              Ti.API.info('cview', currentView);
            }
        break;
    }
    switch(e.to)
    {
      case "campaignStreams":
        $.headerText.text = "Campaigns";
        $.createCampaignButton.show();// new ViewHelper().showElement($.createCampaignButton);
        $.footerBar.show();// new ViewHelper().showElement($.footerBar);
      break;

      case "userProfile":
        $.headerText.text = "Profile";
        $.menuButton.hide();// new ViewHelper().hideElement($.menuButton);
        $.backButton.show();// new ViewHelper().showElement($.backButton);
        $.createCampaignButton.hide();// new ViewHelper().hideElement($.createCampaignButton);
        $.footerBar.show();// new ViewHelper().showElement($.footerBar);
      break;

      case "myProfile":
        $.headerText.text = "My Profile";
        $.menuButton.hide();// new ViewHelper().hideElement($.menuButton);
        $.backButton.show();// new ViewHelper().showElement($.backButton);
        $.createCampaignButton.show();// new ViewHelper().hideElement($.createCampaignButton);
        $.footerBar.show();// new ViewHelper().showElement($.footerBar);
      break;

      case "surveyView":
        $.headerText.text = "Consensus";
        $.menuButton.hide(); //new ViewHelper().hideElement($.menuButton);
        $.backButton.show(); //new ViewHelper().showElement($.backButton);
        $.createCampaignButton.hide(); //new ViewHelper().hideElement($.createCampaignButton);
        $.footerBar.hide(); //new ViewHelper().hideElement($.footerBar);
      break;

      case "createCampaign":
        $.headerText.text = "Publish";
        $.menuButton.hide(); //new ViewHelper().hideElement($.menuButton);
        $.backButton.show(); //new ViewHelper().showElement($.backButton);
        $.createCampaignButton.hide(); //new ViewHelper().hideElement($.createCampaignButton);
        $.footerBar.show(); //new ViewHelper().showElement($.footerBar);
      break;
    }
}

function navBarToggle(toggle)
{
  Ti.API.info('navBarToggle', toggle);
  if (toggle == "on")
  {
    $.navigationBar.top = TRUE_TOP;
    $.navigationBar.height = NAVIGATION_HEIGHT;
    $.contentWrapper.top = WRAPPER_TOP;
    $.contentModal.top = WRAPPER_TOP;
    $.navigationBar.show();
  }
  else if (toggle == "off")
  {
    $.navigationBar.top = 0;
    $.navigationBar.height = 0;
    $.contentWrapper.top = TRUE_TOP;
    $.contentModal.top = TRUE_TOP;
    $.navigationBar.hide();
  }
}

function footerBarToggle(toggle)
{
  if (toggle == "on")
  {
    $.footerBar.bottom = 0;
    $.footerBar.height = 40;
    $.contentWrapper.bottom = 40;
    $.footerBar.show();
  }
}
function alertHandler(e)
{
    Ti.API.info('alertHandler', e.source.id);

    if (e.source.id == "yes")
    {
        beaconClicked.view.parent.remove(beaconClicked.view);
    }

    $.footerAlert.animate(
    {
        bottom: -100,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT
    }, function()
    {
        Ti.API.info('animate done');
    });
}

function backClickHandler(e)
{
  Ti.API.info('back button', e, viewTo);

  switch(viewTo)
  {
    case "userProfile":
      navChangeEvent({from:"userProfile", to:"campaignStreams", fromModal: true, toModal: false});
      $.backButton.hide(); //new ViewHelper().hideElement($.backButton);
      $.menuButton.show(); //new ViewHelper().showElement($.menuButton);
      break;

      case "myProfile":
        navChangeEvent({from:"myProfile", to:viewFrom, fromModal: toModal, toModal: false});
        $.backButton.hide(); //new ViewHelper().hideElement($.backButton);
        $.menuButton.show(); //new ViewHelper().showElement($.menuButton);
        break;

      case "surveyView":
        navChangeEvent({from:"surveyView", to:"campaignStreams", fromModal: true, toModal: false});
        $.backButton.hide(); //new ViewHelper().hideElement($.backButton);
        $.menuButton.show(); //new ViewHelper().showElement($.menuButton);
        break;

      case "createCampaign":
        navChangeEvent({from:"createCampaign", to:"campaignStreams", fromModal: true, toModal: false});
        $.backButton.hide(); //new ViewHelper().hideElement($.backButton);
        $.menuButton.show(); //new ViewHelper().showElement($.menuButton);
        break;
  }
}

function createCampaignHandler(e)
{
  navChangeEvent({from:"campaignStreams", to:"createCampaign", fromModal:false, toModal:true, data:{}});
}

function myProfileTouchEndHandler(e)
{
  Ti.API.info('myProfile touch end', e);
  navChangeEvent({from:viewTo, to:"myProfile", fromModal:toModal, toModal:true, data:{}});
}

$.index.open();
