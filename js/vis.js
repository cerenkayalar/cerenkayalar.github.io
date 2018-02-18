/*var w = window.innerWidth;
var h = window.innerHeight;*/
var dataset;

var vis = d3.select("body").append("svg:svg").attr("width", w).attr("height", h);

d3.csv("eval.csv", function (data) {
    dataset = data;
});

var margin = {top: 5, right: 40, bottom: 20, left: 120},
    width = 960 - margin.left - margin.right,
    height = 50 - margin.top - margin.bottom;

var chart = d3.bullet()
    .width(width)
    .height(height);
