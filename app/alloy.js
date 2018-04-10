var config = require("singleton-config");

config.user = {};
config.userBrand = {};
config.userBrand.ranks = {};

config.userFollowing = [];

config.users = [];
config.beacons = [];
config.campaigns = [];

config.endpoint = "http://localhost:1337";

config.colors = {};
config.colors.primaryBG = "#03a9f4";
config.colors.headerBG = "#2b5e93";
config.colors.bodyBG = "#214f7e";

config.navigation = {};
config.viewHelper = {};
config.viewHelper.elements = [];
config.views = {};

config.osname = Ti.Platform.osname;
config.platform = {};
config.platform.name = Titanium.Platform.name;
config.platform.version = Ti.Platform.version;
if (config.platform.name == "android")
{
    config.isDroid = true;
	config.isIos = false;
	config.endpoint = "http://10.0.2.2:1337";
    config.deviceHeight = parseInt(Ti.Platform.displayCaps.platformHeight  / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10);
    config.deviceWidth = parseInt(Ti.Platform.displayCaps.platformWidth  / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10);
}
else // iOS
{
    config.isIos = true;
    config.isDroid = false;
    config.deviceHeight = Ti.Platform.displayCaps.platformHeight;
    config.deviceWidth = Ti.Platform.displayCaps.platformWidth;
}

// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};



// added during app creation. this will automatically login to
// ACS for your application and then fire an event (see below)
// when connected or errored. if you do not use ACS in your
// application as a client, you should remove this block
(function(){
var ACS = require('ti.cloud'),
    env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development',
    username = Ti.App.Properties.getString('acs-username-'+env),
    password = Ti.App.Properties.getString('acs-password-'+env);

// if not configured, just return
if (!env || !username || !password) { return; }
/**
 * Appcelerator Cloud (ACS) Admin User Login Logic
 *
 * fires login.success with the user as argument on success
 * fires login.failed with the result as argument on error
 */

/*
ACS.Users.login({
	login:username,
	password:password,
}, function(result){
	if (env==='development') {
		Ti.API.info('ACS Login Results for environment `'+env+'`:');
		Ti.API.info(result);
	}
	if (result && result.success && result.users && result.users.length){
		Ti.App.fireEvent('login.success',result.users[0],env);
	} else {
		Ti.App.fireEvent('login.failed',result,env);
	}
});
//*/

})();
