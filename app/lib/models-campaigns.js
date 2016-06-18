//var LoginResultVO = require("platform-titanium/core/models/loginresult.model");

function Campaign()
{
    Ti.API.info("Campaign constructor");
    this.name = undefined;
    this.teaser = undefined;
    this.engagementType = "beacons";
    this.rewardsType = "none";
    this.targetRanks = [];
    this.featuredType = 0;
    this.sample = 0;
    this.isActive = false;
    this.isComplete = false;
    this.isPrivate = false;
    this.brand = undefined;
    this.suggested = [];
    this.demographic = undefined;
    this.schedule = undefined;
    this.reports = [];
    this.metrics = [];
    this.beacons = [];
    this.userPermissions = [];
}

Campaign.prototype.setter = function(obj)
{
    for (var prop in obj)
    {
        this[prop] = obj[prop];

        // if (prop == "email" || prop == "role")
        // {
        //     Ti.API.info("LoginVO setter", prop, obj[prop]);
        //     Ti.App.Properties.setString("LoginVO_" + obj[prop]);
        // }
    }
    //Ti.API.info("LoginVO setter", this);
    return this;
};

Campaign.prototype.getter = function()
{
    //Ti.API.info("LoginVO getter", this);
    var obj = {};
    for (var prop in this)
    {
        if (prop != 'getter' && prop != 'setter')
            obj[prop] = this[prop];
    }

    return obj;//._data;
};

module.exports = Campaign;
