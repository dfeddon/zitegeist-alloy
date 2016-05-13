var ApiService = require("api.services");
var config = require("singleton-config");
var ModelUsers = require("models-users");
var UserHelper = require("helpers-users");

function register(e)
{
  Ti.API.info('register...');
  $.container.fireEvent("navChangeEvent", {from:"signin", to:"onboardSplash"});
}

function doSignin(e)
{
  Ti.API.info('signin', $.email.value, $.password.value);

  new ApiService().api("post", "users/signin", {email:$.email.value, password:$.password.value}, function(err, jsonResponse)
  {
    if (err)
    {
      Ti.API.info('error', err);
      //$.tableview.data = lastdata;
    }
    else
    {
      Ti.API.info('results', jsonResponse);

      if (jsonResponse.error)
      {
        // handle error
        // modal
        return;
      }

      Ti.API.info('success!', jsonResponse);
      // store user model
      var userVO = new ModelUsers().setter(jsonResponse);
      //Ti.API.info('uservo', userVO.getter());
      var userAdded = new UserHelper().addUser(userVO);
      Ti.API.info('user added', userAdded);
      // ensure onboarding
      // count beacons, if low prompt to add more
      // othwerise, go to campaign stream
      $.container.fireEvent("navChangeEvent", {from:"signin", to:"campaignStreams", beacons: jsonResponse.beacons});
      // dispatch user beacons

      // search for messages
    }
  });
}
