var C = require('/lib/render-js/class.js');
var P = require('/lib/xp/portal');


//var dom = C.dom;

// HTML element functions
var doctype = C.doctype;
var html = C.html;
var head = C.head;
var title = C.title;
var body = C.body;
var main = C.main;

// DOM functions
var clone = C.clone;
var domPath = C.domPath;
var setAttribute = C.setAttribute;
var setContent = C.setContent;
var render = C.render;


// Static semantics
var VIEW = [
  doctype(),
  html([
    head(title()),
    body(main())
  ])
]; //log.info('VIEW:' + JSON.stringify(VIEW, null, 4));

exports.get = function(request) {

  // Make sure we don't mess with the static object
  var dom = clone(VIEW); //log.info('dom:' + JSON.stringify(dom, null, 4));

  // Content
  var content = P.getContent();
  setContent(domPath(dom, 'html.head.title'), 'Page Title');

  // Could use chaining instead:
  var mainRef = domPath(dom, 'html.body.main');
  setAttribute(mainRef, 'dataPortalRegion', 'main');
  setContent(
    mainRef,
    content.page.regions.main.components && content.page.regions.main.components.map(function(component) {
      return '<!--# COMPONENT ' + component.path + ' -->';
    }) || '');

  // Generate html, css and more...
  var result = render(dom);

  return {
    body: result.html,
    contentType: 'text/html; charset=utf-8'
  }; // return
} // exports.get
