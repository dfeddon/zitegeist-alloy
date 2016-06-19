//var LoginResultVO = require("platform-titanium/core/models/loginresult.model");

function Rewards()
{
    //Ti.API.info("Rewards constructor");

    // properties
    this.type = "none";
    this.credits = 0;
    this.couponText = undefined;
    this.couponCode = undefined;
    this.couponPrefix = undefined;
    this.dateCreated = undefined;
    this.dateEdited = undefined;

    return this.getter();
}

Rewards.prototype.setter = function(obj)
{
    for (var prop in obj)
    {
        this[prop] = obj[prop];
    }
    //Ti.API.info("Rewards setter", this);

    return this;
};

Rewards.prototype.getter = function()
{
    //Ti.API.info("Rewards getter", this);
    var obj = {};

    for (var prop in this)
    {
        //Ti.API.info('prop', prop, this[prop]);
        if (prop != 'getter' && prop != 'setter')
             obj[prop] = this[prop];
    }

    return obj;
};

module.exports = Rewards;
