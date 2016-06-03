//var LoginResultVO = require("platform-titanium/core/models/loginresult.model");

function UserBeacon()
{
    Ti.API.info("UserBeacon constructor");

    this.beacon = undefined;
    //this.age = 0;
    this.archived = false;
    this.dateCreated = undefined;
    this.dateEdited = undefined;
}

UserBeacon.prototype.setter = function(obj)
{
    for (var prop in obj)
    {
        this[prop] = obj[prop];
    }
    Ti.API.info("UserBeacon setter", this);
    return this;
};

UserBeacon.prototype.getter = function()
{
    Ti.API.info("UserBeacon getter", this);
    var obj = {};
    for (var prop in this)
    {
        Ti.API.info('prop', prop, this[prop]);
        if (prop != 'getter' && prop != 'setter')
            obj[prop] = this[prop];
    }

    return obj;
};

module.exports = UserBeacon;
