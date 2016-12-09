(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['cell'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                           \n                           \n                           \n                        <div class=\"dropdown\">\n                        <span>"
    + alias4(((helper = (helper = helpers.classid || (depth0 != null ? depth0.classid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"classid","hash":{},"data":data}) : helper)))
    + "</span>\n                        <div class=\"dropdown-content\">\n                        <p>"
    + alias4(((helper = (helper = helpers.detail || (depth0 != null ? depth0.detail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"detail","hash":{},"data":data}) : helper)))
    + "</p> \n                        <div class=\"dismiss-button\">&times;</div>\n";
},"useData":true});
})();