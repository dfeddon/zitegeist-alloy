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

  // new ApiService().api("post", "users/signin", {email:$.email.value, password:$.password.value}, function(err, jsonResponse)
  new ApiService().api("post", "oauth2/token",
  {
    grant_type:'password',
    client_secret:"this_is_my_secret",
    client_id:"this_is_my_id",
    username:$.email.value,
    password:$.password.value
  }, function(err, jsonResponse)
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
      // set isRegistered local property
      Ti.App.Properties.setString('isRegistered', "true");
      // store tokens
      config.token = jsonResponse.access_token;
      config.refreshToken = jsonResponse.refresh_token;

      getUserByLogin();
    }
  });
}

function getUserByLogin()
{
  // get userId from accessToken (by token)
  new ApiService().api("post", "users/signin", {email:$.email.value, password:$.password.value}, function(err, jsonResponse)
  {
    if (err)
    {
      Ti.API.info('error', err);
      //$.tableview.data = lastdata;
    }
    else
    {
      var userVO = new ModelUsers().setter(jsonResponse);
      //Ti.API.info('uservo', userVO.getter());
      var userAdded = new UserHelper().addUser(userVO);
      Ti.API.info('user added', userAdded);
      // ensure onboarding
      // count beacons, if low prompt to add more
      // store brands followed
      new ApiService().api("get", "brandFollows/user/" + userVO._id, {}, function(err, jsonResponse)
      {
        if (err)
        {
          Ti.API.info('error', err);
          //$.tableview.data = lastdata;
        }
        else
        {
          Ti.API.info('following brands:', jsonResponse);
          // store results
          config.userFollowing = jsonResponse;
          // now, go to campaign stream
          $.container.fireEvent("navChangeEvent", {from:"signin", to:"campaignStreams", beacons: jsonResponse.beacons});
          // dispatch user beacons
          // search for messages
        }
      });
    }
  });
}

function getUserById(id)
{
      // get user
      new ApiService().api("post", "users/" + userId, {email:$.email.value, password:$.password.value}, function(err, jsonResponse)
      {
        if (err)
        {
          Ti.API.info('error', err);
          //$.tableview.data = lastdata;
        }
        else
        {
          // store user model
          var userVO = new ModelUsers().setter(jsonResponse);
          //Ti.API.info('uservo', userVO.getter());
          var userAdded = new UserHelper().addUser(userVO);
          Ti.API.info('user added', userAdded);
          // ensure onboarding
          // count beacons, if low prompt to add more
          // store brands followed
          new ApiService().api("get", "brandFollows/user/" + userVO._id, {}, function(err, jsonResponse)
          {
            if (err)
            {
              Ti.API.info('error', err);
              //$.tableview.data = lastdata;
            }
            else
            {
              Ti.API.info('following brands:', jsonResponse);
              // store results
              config.userFollowing = jsonResponse;
              // now, go to campaign stream
              $.container.fireEvent("navChangeEvent", {from:"signin", to:"campaignStreams", beacons: jsonResponse.beacons});
              // dispatch user beacons
              // search for messages
            }
          });
        }
  });
}
//});}
