define(['../helpers'], function (h) {
	'use strict';
	function demo(app) {

		var numPoints = 6;

		function init() {
			app.parentGroup.line(250, 0, 250, 500).stroke('red');
			app.parentGroup.line(0, 250, 500, 250).stroke('red');
			var center = 250,
				radius = 30,
				radiusHalf = radius / 2,
				padding = 100;

			var squareStyle = {
				fill: 'none',
				stroke: 'green'
			}

			var squares = [
				app.parentGroup.rect(radius, radius).style(squareStyle).move(center - radiusHalf,center - (radius + padding) ),
				app.parentGroup.rect(radius, radius).style(squareStyle).move(center + padding,center - radiusHalf),
				app.parentGroup.rect(radius, radius).style(squareStyle).move(center - radiusHalf,center + padding),
				app.parentGroup.rect(radius, radius).style(squareStyle).move(center - (radius + padding) ,center - radiusHalf)
			];

			var ranges = [];
			// points = [];

			for (var i = 0; i < 4; i++) {
				var currCirlce = squares[i].bbox();
				ranges.push([[currCirlce.x, currCirlce.cx + (currCirlce.width / 2) ], [currCirlce.y, currCirlce.cy + (currCirlce.height / 2)]]);
			}

			var points = genPoints(ranges);
			// var points1 = genPoints(ranges);

			var points = [];
			var polygons = [];

			var numPolygons = 5;
			for (var i = 0; i < numPolygons; i++) {
				points.push(genPoints(ranges));
				polygons.push(app.parentGroup
								.polygon([points[i]])
								.stroke('red')
								.opacity(0.25))
			}

		}

		function genPoints(ranges) {
			var points = [];
			for (var i = 0; i < 4; i++) {
				points.push(h.genRandom(ranges[i][0][0], ranges[i][0][1]), h.genRandom(ranges[i][1][0], ranges[i][1][1]))
			}
			return points;
		}

		function reset() {
			app.parentGroup.clear();
		}

		return {
			init: init,
			reset: reset,
			app: app
		}

	}

	return demo;

});