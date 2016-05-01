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

// LoginVO.prototype._data =
// {
    // email: null,
    // password: null,
    // role: null,
    // error: null,
    // loginResult: new LoginResultVO()
// };

Beacon.prototype.setter = function(obj)
{
    for (var prop in obj)
    {
        this[prop] = obj[prop];

        // if (prop == "email" || prop == "role")
        // {
        //     Ti.API.info("Beacon setter", prop, obj[prop]);
        //     //Ti.App.Properties.setString("Beacon_" + obj[prop]);
        // }
    }
    Ti.API.info("Beacon setter", this);
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

    return obj;//._data;
};

module.exports = Beacon;
