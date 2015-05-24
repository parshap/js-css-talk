"use strict";

var React = require("react");
var slides = require("./slides");
var fs = require("fs");
var template = fs.readFileSync(__dirname + "/template.html", "utf8");

var slidesHtml = slides.map(function(slide) {
  return React.renderToStaticMarkup(slide);
}).join("\n");

var html = template.replace("{{{slides}}}", slidesHtml);

console.log(html);
