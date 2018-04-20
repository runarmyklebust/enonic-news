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
}, R.article([
    R.img(),
    R.div({
      _s: {
        display: 'inline-block',
        paddingLeft: 10,
        verticalAlign: 'top',
        width: '49%'
      }
    },[
      R.h3(),
      R.p()//,
      //R.time()
    ])
  ])
);
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
      R.access(anItem, 'article.img').setAttributes({
        height: ITEM_HEIGHT,
        src: item.image
      }).setStyle({
        display: 'inline-block',
        width: '49%'
      });
    } else {

    }
    R.access(anItem, 'article.div.h3').setContent(item.title);
    R.access(anItem, 'article.div.p').setContent(item.description);
    //R.access(anItem, 'article.div.time').setContent(item.timestamp);
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
