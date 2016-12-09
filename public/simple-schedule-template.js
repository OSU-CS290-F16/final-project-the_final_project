(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['simple-schedule'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"user-new-class\">\r\n    <p><span class=\"classid\">classID: </span ><a class=\"id\">"
    + alias4(((helper = (helper = helpers.classid || (depth0 != null ? depth0.classid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"classid","hash":{},"data":data}) : helper)))
    + "</a></p>\r\n    <p><span class=\"weekday\">Weekday: </span ><a class=\"week\">"
    + alias4(((helper = (helper = helpers.weekday || (depth0 != null ? depth0.weekday : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"weekday","hash":{},"data":data}) : helper)))
    + "</a></p>\r\n    <p><span class=\"time\">Time: </span><a class=\"the_time\">"
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "</a></p>\r\n    <p><span class=\"details\">Details: </span><a class=\"the_detail\">"
    + alias4(((helper = (helper = helpers.details || (depth0 != null ? depth0.details : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"details","hash":{},"data":data}) : helper)))
    + "</a></p>\r\n    <p class=\"dismiss-button-in-block\"><a>&times;</a></p>\r\n    \r\n</div>\r\n";
},"useData":true});
})();