//var LoginResultVO = require("platform-titanium/core/models/loginresult.model");

function Brands()
{
    Ti.API.info("Brands constructor");

    // properties
    this._id = undefined;
    this.campaigns = [];
    this.userPermissions = [];
    this.owner = {};
    this.dateCreated = undefined;
    this.dateEdited = undefined;
}

Brands.prototype.setter = function(obj)
{
    for (var prop in obj)
    {
        this[prop] = obj[prop];
    }
    Ti.API.info("Brands setter", this);

    return this;
};

Brands.prototype.getter = function()
{
    Ti.API.info("Brands getter", this);
    var obj = {};
    
    for (var prop in this)
    {
        Ti.API.info('prop', prop, this[prop]);
        if (prop != 'getter' && prop != 'setter')
             obj[prop] = this[prop];
    }

    return obj;
};

module.exports = Brands;
