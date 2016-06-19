//var LoginResultVO = require("platform-titanium/core/models/loginresult.model");

function CampaignEngagements()
{
    //Ti.API.info("CampaignEngagements constructor");

    // properties
    this.type = "beacons";
    this.ranks = [];
    this.beacons = [];

    return this.getter();
}

CampaignEngagements.prototype.setter = function(obj)
{
    for (var prop in obj)
    {
        this[prop] = obj[prop];
    }
    //Ti.API.info("CampaignEngagements setter", this);

    return this;
};

CampaignEngagements.prototype.getter = function()
{
    //Ti.API.info("CampaignEngagements getter", this);
    var obj = {};

    for (var prop in this)
    {
        //Ti.API.info('prop', prop, this[prop]);
        if (prop != 'getter' && prop != 'setter')
             obj[prop] = this[prop];
    }

    return obj;
};

module.exports = CampaignEngagements;
