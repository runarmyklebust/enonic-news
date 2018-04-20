var R = require('/lib/render-js/class.js');
var P = require('/lib/xp/portal');
var S = require('/lib/store/store');

var ITEM_HEIGHT = 225;

var UL = R.ul({
  dataPortalComponentType: 'part',
  _s: {
    backgroundColor: '#333',
    listStyle: 'none',
    margin: '0',
    padding: '2px',
    display: 'grid',
  },
  _m: {
    'minWidth375': {
      gridColumnGap: '2px',
      gridRowGap: '2px',
      gridTemplateColumns: '1fr 1fr'
    },
    'minWidth768': {
      gridTemplateColumns: '1fr 1fr 1fr'
    },
    'minWidth1024': {
      gridTemplateColumns: '1fr 1fr 1fr 1fr'
    }
  }
});
R.build(UL);

var LI = R.li({
  _s: {
    height: ITEM_HEIGHT
  }
}, R.article());
R.build(LI);


function getRandomColor() {
  var letters = 'CDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}


exports.get = function(request) {
  var items = S.fetchItems({count: 12}); log.info('items: ' + JSON.stringify(items, null, 4));
  var dom = R.clone(UL);
  R.access(dom).setContent(items.map(function(item) {
    var anItem = R.clone(LI);
    R.access(anItem).setStyle({
      backgroundColor: getRandomColor(),
    }).setMedia({
      'minWidth768': {
        gridColumnStart: 'span ' + Math.floor((Math.random() * 2) + 1)
      }
    });
    if(item.image) {
      R.access(anItem, 'article').addContent(R.img({src: item.image}));
    } else {
      R.access(anItem, 'article').addContent([
        R.h3({
          _s: {
            margin: 5
          }
        }, item.title),
        R.p({
          _s: {
            margin: 5
          }
        }, item.description)
      ]);
    }
    return anItem;
  })); // dom
  var r = R.render(dom);
  return {
    body: r.html,
    contentType: 'text/html; charset=utf-8',
    pageContributions: {
      headEnd: R.render(R.style({type: 'text/css'}, r.css.join('\n'))).html
    }
  };
};
