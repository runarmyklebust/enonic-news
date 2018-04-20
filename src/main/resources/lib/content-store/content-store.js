var contentLib = require('/lib/xp/content');

exports.fetchNews = function (params) {
    return doGetNews(getStart(), params.count ? params.count : 1);
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