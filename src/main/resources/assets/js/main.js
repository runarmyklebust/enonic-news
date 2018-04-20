"use strict";
(function ($) {
    var svcUrl = document.currentScript.getAttribute('data-svcurl');

    $(function () {

        fetchData(4);

        window.setInterval(function () {
            fetchData();
        }, 5000);
    });

    var fetchData = function (count, filters) {

        console.log("SvcUrl: %s", svcUrl);

        $.ajax({
            url: svcUrl + 'data-fetcher',
            method: 'GET',
            data: {
                count: count
            }
        }).then(function (data) {
            console.log(data);
        }).fail(function (jqXHR) {
            console.log("FAILED!");
        });
    }

}(jQuery));
