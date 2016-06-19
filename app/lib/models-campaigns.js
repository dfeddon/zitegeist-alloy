//var LoginResultVO = require("platform-titanium/core/models/loginresult.model");
var RewardsModel = require("models.rewards");
var CampaignEngagementsModel = require("models.campaignEngagements");

function Campaign()
{
    Ti.API.info("Campaign constructor");
    this.name = undefined;
    this.teaser = undefined;
    this.reward = new RewardsModel();

    //this.engagementType = "beacons";
    //this.targetRanks = [];
    //this.beacons = [];
    this.engagement = new CampaignEngagementsModel();

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
    this.userPermissions = [];

    return this.getter();
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
