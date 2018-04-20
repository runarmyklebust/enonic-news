var portal = require('/lib/xp/portal'); // Import the portal functions
var contLib = require('/lib/xp/content'); // Import the content library functions
var thymeleaf = require('/lib/xp/thymeleaf'); // Import the Thymeleaf rendering function


// Specify the view file to use
var view = resolve('newsitem-grid.html');

// Handle the GET request
exports.get = function (req) {

    // Get all the rules
    var hits = []; /*contLib.getChildren({
        count: 9999,
        key: portal.getContent()._path,
    }).hits; //*/

    var model = {
        newsitems: [],
    };

    if (hits.length > 0) {
        // Loop through the rules and extract the needed data
        for (var i = 0; i < hits.length; i++) {
            var current  = hits[i];
           
            log.info(JSON.stringify(current, null, 2));
			
			if (current.type === "com.enonic.enonicnews:newsitem") {
				var newsitem = {
				    id: current._id,
                    title: current.displayName,
                    date: current.date,
                    text: current.text,
                    photo: current.photo,
                    color: current.color,
                };
                model.newsitems.push(newsitem);
			}
        }
    }

    // Return the response object
    return {
        body: thymeleaf.render(view, model),
    };
};
