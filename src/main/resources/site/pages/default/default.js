var mustache = require('/lib/xp/mustache');
var portalLib = require('/lib/xp/portal');

var view = resolve('./default.html');

exports.get = handleGet;

function handleGet(req) {
    var params = {
        assetsUri: portalLib.assetUrl({path: ""}),
        svcUrl: portalLib.serviceUrl({service: 'Z'}).slice(0, -1)
    };

    return {
        contentType: 'text/html',
        body: mustache.render(view, params)
    };

};