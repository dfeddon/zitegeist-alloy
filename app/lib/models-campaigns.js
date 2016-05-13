//var LoginResultVO = require("platform-titanium/core/models/loginresult.model");

this.name = undefined;
this.teaser = undefined;
this.featuredType = 0;
this.demographic = undefined;
this.schedule = undefined;
this.reports = [];
this.metrics = [];
this.beacons = [];
this.userPermissions = [];

function Campaign()
{
    Ti.API.info("Campaign constructor");
}

// LoginVO.prototype._data =
// {
    // email: null,
    // password: null,
    // role: null,
    // error: null,
    // loginResult: new LoginResultVO()
// };

Campaign.prototype.setter = function(obj)
{
    for (var prop in obj)
    {
        this[prop] = obj[prop];

        if (prop == "email" || prop == "role")
        {
            Ti.API.info("LoginVO setter", prop, obj[prop]);
            Ti.App.Properties.setString("LoginVO_" + obj[prop]);
        }
    }
    Ti.API.info("LoginVO setter", this);
};

Campaign.prototype.getter = function()
{
    Ti.API.info("LoginVO getter", this);
    var obj = {};
    for (var prop in this)
    {
        if (prop != 'getter' && prop != 'setter')
            obj[prop] = this[prop];
    }

    return obj;//._data;
};

module.exports = Campaign;
