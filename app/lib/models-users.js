//var LoginResultVO = require("platform-titanium/core/models/loginresult.model");

function Users()
{
    Ti.API.info("Users constructor");

    // properties
    this._id = undefined;
    this.displayName = undefined;
    this.username = undefined;
    this.email = undefined;
    this.password = undefined;
    this.phone = undefined;
    this.addressZip = undefined;
    this.addressCountry = "us";
    this.language = "en";
    this.beacons = [];
    this.brand = {};
    this.dateCreated = undefined;
    this.dateEdited = undefined;
}

Users.prototype.setter = function(obj)
{
    for (var prop in obj)
    {
        this[prop] = obj[prop];
    }
    Ti.API.info("Users setter", this);

    return this;
};

Users.prototype.getter = function()
{
    Ti.API.info("Users getter", this);
    var obj = {};
    for (var prop in this)
    {
        Ti.API.info('prop', prop, this[prop]);
        if (prop != 'getter' && prop != 'setter')
             obj[prop] = this[prop];
    }

    return obj;
};

module.exports = Users;
