//var LoginResultVO = require("platform-titanium/core/models/loginresult.model");
//var RewardsModel = require("models.rewards");
//var MetricEngagementsModel = require("models.MetricEngagements");

function Metric()
{
    Ti.API.info("Metric constructor");
    this.name = undefined;
    this.index = 0;
    this.type = "selection";
    this.variable = undefined;
    this.indexStyle = undefined;
    this.question = undefined;
    this.response = [];
    this.layout = undefined;
    this.isPreset = false;
    this.presetLabel = undefined;
    this.randomize = false;
    this.reverse = false;
    this.randomizeItems = false;
    this.scale = 0;
    this.items = [];

    return this.getter();
}

Metric.prototype.setter = function(obj)
{
    for (var prop in obj)
    {
        this[prop] = obj[prop];
    }

    return this;
};

Metric.prototype.getter = function()
{
    var obj = {};
    for (var prop in this)
    {
        if (prop != 'getter' && prop != 'setter')
            obj[prop] = this[prop];
    }

    return obj;
};

module.exports = Metric;
