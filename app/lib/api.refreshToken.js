var config = require("singleton-config");

function RefreshToken()
{
    Ti.API.info('refreshToken constructor');
}

RefreshToken.prototype.update = function(token, clientId, callback)
{
    Ti.API.info('refreshToken.update', token, callback);

    var xhr = Titanium.Network.createHTTPClient();

    xhr.open("POST", config.endpoint + "/oauth2/refreshToken");
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    data = JSON.stringify({refreshToken:config.refreshToken, clientId:clientId});
    xhr.send(data);

    xhr.onload = function()
    {
        Ti.API.info('data received::', this.responseText);

        //config.token = this.responseText.token;
        //config.refreshToken = this.responseText.refreshToken;

        if (this.responseText != null)
            jsonResponse = JSON.parse(this.responseText);
        else console.log('response is NULL');
        return callback(null, jsonResponse);
    };

    xhr.onerror = function(e)
    {
        Ti.API.info("Server Returned Error", e);

        return callback(e, null);
    };
};

module.exports = RefreshToken;
