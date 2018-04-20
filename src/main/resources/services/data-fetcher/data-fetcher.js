exports.get = function (req) {

    var resultId = req.id;

    var data = {
        message: "Fetch data from the service"
    };

    return {
        status: 200,
        body: data,
        contentType: 'application/json'
    }

};
