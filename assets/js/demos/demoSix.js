define(['../helpers'], function (h) {
	'use strict';
	function demo(app) {

		var center = 250,
			sideLength = 30,
			sideLengthHalf = sideLength / 2,
			loopTimer = 50, // timer between each iteration
			padding = 200, // padding for the squares from the center of the grid
			initited = false,
			squareStyle = {
				fill: 'none',
				stroke: 'red'
			},
			polygonStyle = {
				opacity: 0.25,
				fill: 'red'
			},
			numPolygons = 10, // number of polygons to make
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
			h.stopTimer(globalTimer)
			if(type && type === 'hard') {
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

			var squares = [
				app.parentGroup.rect(sideLength, sideLength).style(squareStyle).move(center - sideLengthHalf,center - (sideLength + padding) ),
				app.parentGroup.rect(sideLength, sideLength).style(squareStyle).move(center + padding,center - sideLengthHalf),
				app.parentGroup.rect(sideLength, sideLength).style(squareStyle).move(center - sideLengthHalf,center + padding),
				app.parentGroup.rect(sideLength, sideLength).style(squareStyle).move(center - (sideLength + padding) ,center - sideLengthHalf)
			];

			// get the ranges of each of the squares
			for (var i = 0; i < 4; i++) {
				var currSquare = squares[i].bbox();
				ranges.push([[currSquare.x, currSquare.cx + (currSquare.width / 2) ], [currSquare.y, currSquare.cy + (currSquare.height / 2)]]);
			}
		}

		/**
		 * render all the polygons
		 * @return {undefined}
		 */
		function renderPolygons() {
			for (var i = 0; i < numPolygons; i++) {
				var polygon = app.parentGroup.polygon(genPoints(ranges)).style(polygonStyle);
				polygons.push(polygon);
			}
		}

		/**
		 * returns an array of randomly generated points
		 * @param  {array} ranges array with arrays of min/max values for each of the poaints
		 * @return {[array]} a one dimensinal array with the final coordinates for the polygon
		 */
		function genPoints(ranges) {
			// houses the cordinates of an array with x1, y1, x2, y,2.... coordinates
			var points = [];
			for (var i = 0; i < 4; i++) {
				points.push(h.genRandom(ranges[i][0][0], ranges[i][0][1]), h.genRandom(ranges[i][1][0], ranges[i][1][1]))
			}
			return [points];
		}

		return {
			init: init,
			reset: reset,
			app: app
		}

	}

	return demo;

});