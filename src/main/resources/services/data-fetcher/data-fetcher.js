var store = require("/lib/store/store");

exports.get = function (req) {

    var count = req.params.count ? req.params.count : 5;

    var result = store.fetchItems({count: count});

    var data = {
        content: result,
        message: "Fetch data from the service"
    };

    return {
        status: 200,
        body: data,
        contentType: 'application/json'
    }

};
