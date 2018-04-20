var contentSource = require("/lib/content-source/content-source");
var photoSource = require("/lib/photo-source/photo-source");
var discussSource = require("/lib/discuss-source/discuss-source");

//var sources = ["news", "discuss", "photos", "training"];
var sources = ["photos", "news", "discuss"];

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
        return contentSource.fetchItem();
        break;
    case "discuss":
        return discussSource.fetchItem();
        break;
    case "photos":
        return photoSource.fetchItem();
        break;
    case "training":
        return {
            type: "training"
        };
        break;
    default:
        return contentSource.fetchItem({count: 1});
    }

};

var getSource = function () {
    return sources[Math.floor(Math.random() * sources.length)];
};
