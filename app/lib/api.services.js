var config = require("singleton-config");
var RefreshToken = require("api.refreshToken");
//var Crypto = require("platform-titanium/core/node_modules/cryptojs/cryptojs").Crypto;
    ////////////////////////////
    // api wrapper
    ////////////////////////////


// constants
//var baseURI = config.endpoint + "/app/";// "https://mobile.icare-health.com/app/";

function ApiService()
{
    Ti.API.info("api constructor...");//, config);
}
    //  fnc api
    //      method (string) eg: GET/POST
    //      route (string) - [baseURI in prepended]
    //      request data (object)
    //      callback (fnc)
ApiService.prototype.performOnContext = function(method, route, data, callback)
{
    // this is required to avoid the 'out of context' bug.
    Ti.API.info("Context!", route);
    var _this = this;
    setTimeout(function()
    {
        _this.api(method, route, data, callback);
    }, 100);
};

ApiService.prototype.api = function(method, route, data, callback)
{
    var _this = this;

    route = encodeURI(route);

    var routePrepend = "/";
    var isAuth = true;
    if (route != "oauth2/token")
    {
        // prepend uri
        routePrepend = "/api/";

        // add Authroization header with Bearer token
        isAuth = false;
    }
    var baseURI = config.endpoint + routePrepend;

    // encrypt/decrypt data?
    var encrypting = false; // default value

    Ti.API.info("===============================");
    Ti.API.info("===============================");
    Ti.API.info("api", config.endpoint);
    Ti.API.info(method);
    Ti.API.info(route);
    Ti.API.info(JSON.stringify(data));

    // force-encrypt all but authentication routes (exception is insertion of binary files)
    var split = route.split("/");
    if (split[0] != "authentication" && split[1] != 'insertfile')
    {
        //if (split[1] != 'getpatientscaregivers')
        encrypting = true;
    }
    else
    {
        // only authenticate login
        if (split[1] == "login")
        {
            encrypting = true;
        }
    }
    // force encryption off/on
    encrypting = false;

    // create and open the HTTPClient object
    var xhr = Titanium.Network.createHTTPClient();
    xhr.open(method.toUpperCase(), baseURI + route);

    Ti.API.info('isAuth', isAuth);
    if (isAuth !== true)
    {
        xhr.setRequestHeader('Authorization', 'Bearer ' + config.token);
        Ti.API.info('setting token', config.token);
    }

    //xhr.setRequestHeader('Cache-Control', 'no-cache');
    //xhr.setRequestHeader('Cache-Control', 'no-store');
    //xhr.clearCookies("http://www.med-wire.com");

    if (method.toLowerCase() == "post" || method.toLowerCase() == "put")
    {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        data = JSON.stringify(data);
    }

    // stringify data
    //Ti.API.info('newdata', data);

    // authorization request header (if apikey exists)
    /*if (config.user)
    {
        xhr.setRequestHeader('Authorization', config.user.apiKey);//,ld.ui.auth);
        Ti.API.info("auth", config.user.apiKey);//ld.ui.auth);
    }*/
    // check for additional (custom) header -- sent as "_header"
    // for example: xhr.setRequestHeader('enctype', 'multipart/form-data');
    // we send in the requestor - {_header: {name:'enctype', value:'multipart/form-data'}}
    if (data && data.hasOwnProperty('_header'))
    {
        // set header
        xhr.setRequestHeader('enctype', 'multipart/form-data');//(data._header.name, data._header.value);
        // remove header request from data obj (no longer needed)
        delete data._header;
    }

    // get length of data object
    // var count = 0;
    // var i;
    //
    // for (i in data)
    // {
        // if (data.hasOwnProperty(i))
        // {
            // count++;
        // }
    // }
    // check for encrytion (in requestor)
    if (data && data.hasOwnProperty('encrypt') && data.encrypt.toString() == '1')
    {
        //Ti.API.info("encrypt ON");
        encrypting = true;
    }
    else if (data && data.hasOwnProperty('encrypt') && data.encrypt.toString() == '0')
    {
        encrypting = false;
    }
    else if (encrypting === true)// && count > 0)
    {
        // encryption has been forced, not requested, so include 'encrypt=1' to requestor (for backend)
        data.encrypt = "1";
        data.encrypt = data.encrypt.toString();
    }
    else
    {
        // no encryption
        //Ti.API.info("encrypt OFF");
    }

    // catch-all: Unencrypting ALL GET requests
    if (method.toLowerCase() == "get")
    {
        encrypting = false;

        // remove encrypt parameter
        if (data.hasOwnProperty('encrypt'))
        {
            delete data.encrypt;
        }
    }

    // final removal of encrypt if encrypting is false
    if (encrypting === false)
    {
        if (data.hasOwnProperty('encrypt'))
        {
            delete data.encrypt;
        }
    }

    Ti.API.info("encrypt =", encrypting);

    // on load
    xhr.onload = function()
    {
        Ti.API.info('data received...', this.responseText);
        //try {
        if (this.responseText != null)
            jsonResponse = JSON.parse(this.responseText);
        else console.log('response is NULL');
        //} catch(e)
        // {
            // Ti.API.info('caught error', route);
            // Ti.API.info(e);
            // Ti.API.info(this.responseText);
        // }

        if (encrypting === true)
        {
            // decrypt
            Ti.API.info("decrypting response...", jsonResponse);
            var decrypt = _this.eachRecursive(jsonResponse, false, function(results)
            {
                //Ti.API.info('decryption complete! Returning results', results);

                Ti.API.info("===============================");
                Ti.API.info("===============================");

                return callback(null, results);
            });
        }
        else
        {
            Ti.API.info("===============================");
            Ti.API.info("===============================");
            return callback(null, jsonResponse);
        }
    };

    // error handling
    xhr.onerror = function(e)
    {
        Ti.API.info("Server Returned Error", e);

        if (e.code.toString() == "401" && config.refreshToken)
        {
            Ti.API.info('attempting to refresh token...');
            // refresh token
            var refreshToken = new RefreshToken().update(config.refreshToken, "this_is_my_id", function(err, response)
            {
                Ti.API.info('refresh RESPONSE', response);

                // update token and refreshToken values
                config.token = response.token;
                config.refreshToken = response.refreshToken;

                // retry original api call
                return _this.api(method, route, data, callback);
            });
        }
        else
        {
            Ti.API.info("===============================");
            Ti.API.info("===============================");

            return callback(e, null);
        }
    };
    if (encrypting === true)
    {
        // encrypt data obj
        //Ti.API.info("encrypting parameters", data);
        this.doEncrypt(data, function(results)
        {
            // send the HTTPClient object (with encrypted data)
            //Ti.API.info('encrypted data', results);

            // send request
            xhr.send(results);
        });
    }
    else
    {
        Ti.API.info("= data:", JSON.stringify(data));
        xhr.send(data);
    }
};


    ////////////////////////////
    // encrypt values
    ////////////////////////////
ApiService.prototype.doEncrypt = function(obj, callback)
{
    //Ti.API.info('encrypting requestor');
    for (var k in obj)
    {
            // handle undefined values (which errors-out during encryption)
            if (obj[k] == undefined)
            {
                Ti.API.info("undefined values sanitized...");
                // convert undefined values to empty string
                // TODO: This is a hack -- validation should be handled in the model, not here!
                obj[k] = '';
            }
        if (typeof obj[k] == "object" && obj[k] !== null && obj[k] != undefined)
        {
            this.eachRecursive(obj[k], true, callback);
        }
        else
        {
            // encrypt
            if (k != "encrypt") // do not encrypt the 'encrypt' parameter
            {
                    // force all parameters to string values
                    obj[k] = obj[k].toString();
                    // encrypt
                //obj[k] = Crypto.AES.encrypt(obj[k], "Password1",{ mode: new Crypto.mode.CBC(Crypto.pad.ZeroPadding) });
                Ti.API.info(k, obj[k]);
            }
        }
    }
    return callback(obj);
};

// Recursively handle both arrays (dimensional?) and complex objects
ApiService.prototype.eachRecursive = function(obj, encryptBool, callback)
{
    var firstrun = false;

    // iteration
    this.iterate = function(obj2)
    {
        for (var k in obj2)
        {
            if (typeof obj2[k] == "object" && obj2[k] !== null)
            {
                this.iterate(obj2[k]);
            }
            else
            {
                // encrypt
                if (encryptBool === true)
                {
                        //obj2[k] = Crypto.AES.encrypt(obj2[k], "Password1",{ mode: new Crypto.mode.CBC(Crypto.pad.ZeroPadding) });
                }
                // decrypt
                else
                {
                        if (k == "error" || k == "Key")// && k != "Key") // ignore JSON error parameter
                            Ti.API.info("ignoring", k);
                        else
                        {
                            //Ti.API.info("pre decrypt", k, obj2[k]);
                            //obj2[k] = Crypto.AES.decrypt(obj2[k], "Password1", { mode: new Crypto.mode.CBC(Crypto.pad.ZeroPadding) });
                            //trimming space from right side of the string (only on url parameters)
                            //if (k == "url" || k == "picture" || k == "email" || k == "userid" || k == "id")
                            //{
                                //Ti.API.info("rtrim", k, obj2[k]);
                                //obj2[k] = rtrim(obj2[k], '\0');
                                //Ti.API.info(obj2[k]);
                            //}
                        }
                }
            }
        }
  }; // end iterate fnc

    // trim zero padding (for decrypted binary links)
    //function rtrim(string, char)
    function rtrim(str, charlist)
    {
        charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
            .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');
        var re = new RegExp('[' + charlist + ']+$', 'g');
        return (str + '')
            .replace(re, '');
        /*for (var i = string.length - 1; i >= 0; i--)
            if (string[i] !== chr)
                return string.slice(0, i + 1);
        return '';*/
}

  // ensure we're running recursion on object only once
  // TODO: instead, test if returnObject is empty?
  if (firstrun === false)
  {
    firstrun = true;

    // start recursion
    this.iterate(obj);
  }

  // and we're done!
  return callback(obj);
};


    ////////////////////////////
    // end api wrapper
    ////////////////////////////

    // export
    module.exports = ApiService;
