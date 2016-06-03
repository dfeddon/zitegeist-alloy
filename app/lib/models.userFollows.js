//var LoginResultVO = require("platform-titanium/core/models/loginresult.model");

function UserFollows()
{
    Ti.API.info("UserFollows constructor");

    // properties
    this._id = undefined;
    this.brand = {};
    this.user = {};
    this.alignment = undefined;
    this.vestment = undefined;
    this.rank = undefined;
    this.progression = undefined;
    this.suggestions = [];
    this.archived = undefined;
    this.dateCreated = undefined;
    this.dateEdited = undefined;
}

UserFollows.prototype.setter = function(obj)
{
    for (var prop in obj)
    {
        this[prop] = obj[prop];
    }
    Ti.API.info("UserFollows setter", this);

    return this;
};

UserFollows.prototype.getter = function()
{
    Ti.API.info("UserFollows getter", this);
    var obj = {};
    for (var prop in this)
    {
        Ti.API.info('prop', prop, this[prop]);
        if (prop != 'getter' && prop != 'setter')
             obj[prop] = this[prop];
    }

    return obj;
};

module.exports = UserFollows;
