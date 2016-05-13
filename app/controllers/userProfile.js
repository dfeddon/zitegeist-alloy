var config = require("singleton-config");

$.displayName.text = config.navigation.data.displayName;
$.username.text = "@" + config.navigation.data.username;
$.displayName.text = config.navigation.data.displayName;

function postLayoutHandler(e)
{
  Ti.API.info('userProfile postLayoutHandler');
  Ti.API.info('config', config.navigation.data);
}
