function ConfigSing()
{
    // do we have an existing instance?
    if (typeof ConfigSing.instance === 'object')
    {
        Ti.API.info("returning instance...", ConfigSing.instance);
        return ConfigSing.instance;
    }

    // this.osnameSetter = function(value)
    // {
        // return this.osname = value;
    // };
//
    // this.osnameGetter = function()
    // {
        // return this.osname;
    // };

    // cache
    ConfigSing.instance = this;
    Ti.API.info("creating instance!", this);
    // implicit return
    return this;
}