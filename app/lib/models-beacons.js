//var LoginResultVO = require("platform-titanium/core/models/loginresult.model");

this._id = undefined;
this.name = undefined;
this.fame = 0;
this.dateCreated = undefined;
this.dateEdited = undefined;

function Beacon()
{
    Ti.API.info("Beacon constructor");
}

Beacon.prototype.setter = function(obj)
{
    for (var prop in obj)
    {
        this[prop] = obj[prop];
    }
    Ti.API.info("Beacon setter", this);
    return this;
};

Beacon.prototype.getter = function()
{
    Ti.API.info("Beacon getter", this);
    var obj = {};
    for (var prop in this)
    {
        Ti.API.info('prop', prop, this[prop]);
        if (prop != 'getter' && prop != 'setter')
            obj[prop] = this[prop];
    }

    return obj;
};

module.exports = Beacon;
