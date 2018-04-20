var R = require('/lib/render-js/class.js');
var P = require('/lib/xp/portal');

var LORUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
var DATA = [{
  displayName: LORUM
}, {
  displayName: LORUM
}, {
  displayName: LORUM
}, {
  displayName: LORUM
}, {
  displayName: LORUM
}, {
  displayName: LORUM
}, {
  displayName: LORUM
}, {
  displayName: LORUM
}, {
  displayName: LORUM
}, {
  displayName: LORUM
}, {
  displayName: LORUM
}, {
  displayName: LORUM
}];

var LI = R.li({
  _s: {
    height: '225px'
  }
}, R.article([
    //R.h3(),
    R.p()
  ])
);
R.build(LI);

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

exports.get = function(request) {
  var partComponent = P.getComponent();
  // log.info('layoutComponent: ' + JSON.stringify(layoutComponent, null, 4));
  var i = 0;
  var dom = R.ul(
    {
      dataPortalComponentType: 'part',
      _s: {
        listStyle: 'none',
        padding: '0',
        //alignContent: layoutComponent.config.alignContent,
        //alignItems: layoutComponent.config.alignItems,
        display: 'grid',
        //gridColumnGap: '30px', //layoutComponent.config.gridColumnGap,
        //gridRowGap: layoutComponent.config.gridRowGap,
        //gridTemplateColumns: '1fr',//layoutComponent.config.gridTemplateColumns,
        //gridTemplateRows: layoutComponent.config.gridTemplateRows,
        //justifyContent: layoutComponent.config.justifyContent,
        //justifyItems: layoutComponent.config.justifyItems
      },
      _m: {
        'minWidth375': {
          gridTemplateColumns: '1fr 1fr'
        },
        'minWidth768': {
          gridTemplateColumns: '1fr 1fr 1fr'
        },
        'minWidth1024': {
          gridTemplateColumns: '1fr 1fr 1fr 1fr'
        }
      }
    },
    DATA.map(function(item) {
      var anItem = R.clone(LI);
      R.access(anItem).setStyle({
        backgroundColor: getRandomColor(),
      }).setMedia({
        'minWidth768': {
          gridColumnStart: 'span ' + Math.floor((Math.random() * 2) + 1)
        }
      });
      R.access(anItem, 'article.p').setContent(item.displayName);
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
