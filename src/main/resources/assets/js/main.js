"use strict";
(function ($) {
    var svcUrl = document.currentScript.getAttribute('data-svcurl');

    $(function () {

        window.setInterval(function () {
            fetchData();
        }, 5000);

    });

    var fetchData = function () {

        console.log("SvcUrl: %s", svcUrl);

        $.ajax({
            url: svcUrl + 'data-fetcher',
            method: 'GET',
            data: {
                id: "fisk"
            }
        }).then(function (data) {
            console.log(data);
        }).fail(function (jqXHR) {
            console.log("FAILED!");
        });
    }

}(jQuery));
