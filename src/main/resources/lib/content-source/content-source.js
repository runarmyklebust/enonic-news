var contentLib = require('/lib/xp/content');
var portalLib = require('/lib/xp/portal');
/*
    item:
    -----
    type
    image
    title
    description
    timestamp
 */
exports.fetchItem = function () {
    var result = doGetNews(getStart(), 1);
    if (result.count > 0) {
        var content = result.hits[0];
        return toItem(content)
    } else {
        return {};
    }
};

var toItem = function (content) {

    var imageUrl = portalLib.imageUrl({
        id: content.data.image,
        scale: 'block(1024,768)',
        type: "absolute"

    });

    return {
        type: "news",
        image: imageUrl,
        title: content.displayName,
        description: content.data.text,
        timestamp: content.modifiedTime
    };
};

var getStart = function () {
    return Math.floor(Math.random() * getTotal());
};

var getTotal = function () {
    var result = doGetNews(0, 0);
    return result.total;
};

var doGetNews = function (start, count) {
    return contentLib.query({
        count: count,
        start: start,
        contentTypes: [
            app.name + ":news"
        ]
    });
};