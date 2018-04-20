var thymeleaf = require('/lib/xp/thymeleaf');
var portalLib = require('/lib/xp/portal');

var view = resolve('./default.html');

exports.get = handleGet;

function handleGet(req) {


    var content = portalLib.getContent();
    var site = portalLib.getSite();

    var sourceFilterLinks = site.x["com-enonic-app-enonicnews"].filterlink.filterlink || [];

    log.info(JSON.stringify({sourceFilterLinks:sourceFilterLinks}, null, 2));

    var filterlinks = [];
    for (var fl in sourceFilterLinks) {
        var f = sourceFilterLinks[fl];
        log.info(JSON.stringify({f:f}, null, 2));

        if (f && f.label && f.href) {

            var params = (f.href && f.href!=="/") ? {filter: f.href.toLowerCase()} : undefined;
            log.info(JSON.stringify({params:params}, null, 2));

            filterlinks.push({
                src: portalLib.pageUrl({
                    path: "/enonic-news",
                    params: params,
                }),
                text: f.label[0].toUpperCase() + f.label.substring(1).toLowerCase(),
            });
        }
    }

    var sidebarStyleUri = portalLib.assetUrl({path: "css/sidebar.css"})

    var params = {
        mainRegion: content.page.regions.main,
        filterlinks: filterlinks,
        heading: site.displayName,
    };

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, params),
        pageContributions: {
            headBegin: '<link href="' + sidebarStyleUri + '" rel=\"stylesheet\">',
        }
    };

};
