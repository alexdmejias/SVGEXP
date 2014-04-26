define(['../helpers'], function (h) {
	'use strict';
	function demo(app) {

		var imageSize = 500,
			center = imageSize / 2,
			rangeSize = 10,
			rangeSizeHalf = rangeSize / 2,
			loopTimer = 20, // timer between each iteration
			padding = 200, // padding for the squareGuides from the center of the grid to the square
			initited = false,
			squareStyle = {
				fill: 'none',
				stroke: 'none'
			},
			polygonStyle = {
				opacity: 0.25,
				fill: 'red'
			},
			numPolygons = 10, // number of polygons to make
			numVertices = 4,
			polygons = [],
			ranges = [],
			globalTimer = null;

		function init() {
			// check if it is being initiated from a hard reset
			if (!initited) {
				setup();
				h.setDrawWidth(500, 500);
				initited = true;
			}

			loop();
		}

		function reset(type) {
			app.parentGroup.clear();
			h.stopTimer(globalTimer);
			if (type && type === 'hard') {
				initited = false;
			}
		}

		function loop() {
			globalTimer = setTimeout(function() {
				reset();
				renderPolygons();
				loop();
			}, loopTimer);
		}

		function setup() {

			var squareGuides = [
				app.parentGroup.rect(rangeSize, rangeSize).style(squareStyle).move(center - rangeSizeHalf,center - (rangeSize + padding) ),
				app.parentGroup.rect(rangeSize, rangeSize).style(squareStyle).move(center + padding,center - rangeSizeHalf),
				app.parentGroup.rect(rangeSize, rangeSize).style(squareStyle).move(center - rangeSizeHalf,center + padding),
				app.parentGroup.rect(rangeSize, rangeSize).style(squareStyle).move(center - (rangeSize + padding) ,center - rangeSizeHalf)
			];

			// get the ranges of each of the squareGuides
			for (var i = 0; i < 4; i++) {
				var currSquare = squareGuides[i].bbox();
				ranges.push([[currSquare.x, currSquare.cx + (currSquare.width / 2) ], [currSquare.y, currSquare.cy + (currSquare.height / 2)]]);
			}
		}

		/**
		 * render all the polygons
		 * @return {undefined}
		 */
		function renderPolygons() {
			for (var i = 0; i < numPolygons; i++) {
				var polygon = app.parentGroup.polygon(genVertices(ranges)).style(polygonStyle);
				polygons.push(polygon);
			}
		}

		/**
		 * returns an array of randomly generated vertices
		 * @param  {array} ranges array with arrays of min/max values for each of the poaints
		 * @return {[array]} a one dimensinal array with the final coordinates for the polygon
		 */
		function genVertices(ranges) {
			// houses the cordinates of an array with x1, y1, x2, y,2.... coordinates
			var vertices = [];
			for (var i = 0; i < numVertices; i++) {
				vertices.push(h.genRandom(ranges[i][0][0], ranges[i][0][1]), h.genRandom(ranges[i][1][0], ranges[i][1][1]));
			}
			return [vertices];
		}

		return {
			init: init,
			reset: reset
		};

	}

	return demo;

});