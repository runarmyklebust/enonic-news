var contentLib = require('/lib/xp/content');
var portalLib = require('/lib/xp/portal');

/*
    item:
    -----
    Type
    PhotoUrl
    Title
    Description
    Timestamp
 */

exports.fetchItem = function () {
    var result = doGetPhoto(getStart(), 1);
    if (result.count > 0) {
        var content = result.hits[0];
        return toItem(content)
    } else {
        return {};
    }
};

var toItem = function (content) {

    var imageUrl = portalLib.imageUrl({
        id: content._id,
        scale: 'block(1024,768)',
        type: "absolute"
    });

    return {
        type: "photo",
        image: imageUrl,
        title: "",
        description: "",
        timestamp: content.modifiedTime
    };
};

var getStart = function () {
    return Math.floor(Math.random() * getTotal());
};

var getTotal = function () {
    var result = doGetPhoto(0, 0);
    return result.total;
};

var doGetPhoto = function (start, count) {
    return contentLib.query({
        count: count,
        start: start,
        filters: {
            hasValue: {
                field: "_parentPath",
                values: ["/content/enonic-news/photos"]
            }
        }
    });
};