var R = require('/lib/render-js/class.js');
var P = require('/lib/xp/portal');

var DATA = [{
  displayName: 'Juhu1'
}, {
  displayName: 'Juhu2'
}];

var LI = R.li(
  R.article([
    R.h3()
  ])
);
R.build(LI);

exports.get = function(request) {
  var partComponent = P.getComponent();
  // log.info('layoutComponent: ' + JSON.stringify(layoutComponent, null, 4));
  var dom = R.ul(
    {
      dataPortalComponentType: 'part',
      _s: {
        listStyle: 'none',
        //alignContent: layoutComponent.config.alignContent,
        //alignItems: layoutComponent.config.alignItems,
        display: 'grid',
        gridColumnGap: '30px', //layoutComponent.config.gridColumnGap,
        //gridRowGap: layoutComponent.config.gridRowGap,
        gridTemplateColumns: '1fr 1fr',//layoutComponent.config.gridTemplateColumns,
        //gridTemplateRows: layoutComponent.config.gridTemplateRows,
        //justifyContent: layoutComponent.config.justifyContent,
        //justifyItems: layoutComponent.config.justifyItems
      }
    },
    DATA.map(function(item) {
      var anItem = R.clone(LI);
      R.access(anItem, 'article.h3').setContent(item.displayName);
      return anItem;
    }) // DATA map
  ); // dom
  // log.info('layoutHtml: ' + JSON.stringify(layoutHtml, null, 4));
  var r = R.render(dom);
  return {
    body: r.html,
    contentType: 'text/html; charset=utf-8',
    pageContributions: {
      headEnd: R.render(R.style({type: 'text/css'}, r.css.join('\n'))).html
    }
  };
};
