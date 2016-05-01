var Users = require("users");
var currentView;

function openHandler(e)
{
    Ti.API.info('opened!');
    if (Ti.App.Properties.isRegistered === true)
    {
        Ti.API.info('login...');
    }
    else
    {
        Ti.API.info('new user, registering...');

        // create unwired user obj
        var user = new Users();
        Ti.API.info('reguser', user.getter());

        // get onboarding splash view
        currentView = Alloy.createController('onboardSplash').getView();
        $.contentWrapper.add(currentView);
    }
}

$.contentWrapper.addEventListener("navChangeEvent", navChangeEvent);

function navChangeEvent(e)
{
    Ti.API.info('nav changed', e);

    $.contentWrapper.remove(currentView);

    currentView = Alloy.createController(e.to).getView();
    $.contentWrapper.add(currentView);
}

$.index.open();
