var httpClient = require('/lib/http-client');
var url = "http://discuss.enonic.com/latest.json";

var fetchedTopics = null;

exports.fetchItem = function () {

    if (!fetchedTopics) {
        fetchedTopics = doFetchTopics();
    }

    var randomItem = fetchedTopics[Math.floor(Math.random() * fetchedTopics.length)];
    return toItem(randomItem);
};

var doFetchTopics = function () {

    var result = getTopics();

    if (result.body.topic_list && result.body.topic_list.topics) {

        return result.body.topic_list.topics;
    }

    return [];
};

var toItem = function (item) {

    return {
        type: "discuss",
        image: item.image_url,
        title: item.title,
        description: item.last_poster_username,
        timestamp: item.last_posted_at
    };
};


var getTopics = function () {
    try {
        var response = httpClient.request({
            url: url,
            method: 'GET',
            connectionTimeout: 10000,
            readTimeout: 5000,
            contentType: 'application/json'
        });

        return unpackResponse(response);

    } catch (e) {
        log.warning('Error contacting discuss: ' + url + ': ' + e.toString());
        return {
            status: -1,
            message: '',
            body: ''
        };
    }
};

var unpackResponse = function (response) {
    return {
        status: response.status,
        message: response.message,
        body: JSON.parse(response.body)
    };
};