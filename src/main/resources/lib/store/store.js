var contentSource = require("/lib/content-store/content-store");

var sources = ["news", "discuss", "photos", "training"];

exports.fetchItems = function (params) {

    var count = params.count ? params.count : 5;

    var results = [];

    for (var i = 0; i <= count; i++) {
        results.push(doFetchItem());
    }

    return results;
};

var doFetchItem = function () {
    switch (getSource()) {
    case "news":
        return contentSource.fetchNews({count: 1});
        break;
    case "discuss":
        return {
            type: "discuss"
        };
        break;
    case "photos":
        return {
            type: "photos"
        };
        break;
    case "training":
        return {
            type: "training"
        };
        break;
    default:
        return contentSource.fetchNews({count: 1});
    }

};

var getSource = function () {
    return sources[Math.floor(Math.random() * sources.length)];
};
