define(['../helpers'], function (h) {
	'use strict';
	function demo(app) {

		var imageSize = 500,
			center = imageSize / 2,
			rangeSize = 10,
			rangeSizeHalf = rangeSize / 2,
			loopTimer = 20, // timer between each iteration
			padding = 200, // padding for the squareGuidesGroup from the center of the grid to the square
			initited = false,
			squareStyle = {
				fill: 'none',
				stroke: 'none'
			},
			polygonStyle = {
				opacity: 0.25
			},
			colors = app.colorScheme,
			color = null,
			numPolygons = 10, // number of polygons to make
			numVertices = 4,
			polygonsGroup = null,
			ranges = [],
			squareGuidesGroup = null, // holds the square guides
			globalTimer = null;

		function init() {
			// check if it is being initiated from a hard reset
			if (!initited) {
				h.setDrawWidth(500, 500);
				squareGuidesGroup = app.parentGroup.group().attr('class', 'squareGuides');
				polygonsGroup = app.parentGroup.group().attr('class', 'polygons');
				setup();
				initited = true;
			}

			color = colors[h.genRandom(colors.length - 1)];
			loop();
		}

		function reset(type) {
			polygonsGroup.clear();
			h.stopTimer(globalTimer);
			if (type && type === 'hard') {
				initited = false;
				app.parentGroup.clear();
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
			squareGuidesGroup.rect(rangeSize, rangeSize).style(squareStyle).move(center - rangeSizeHalf,center - (rangeSize + padding) ),
			squareGuidesGroup.rect(rangeSize, rangeSize).style(squareStyle).move(center + padding,center - rangeSizeHalf),
			squareGuidesGroup.rect(rangeSize, rangeSize).style(squareStyle).move(center - rangeSizeHalf,center + padding),
			squareGuidesGroup.rect(rangeSize, rangeSize).style(squareStyle).move(center - (rangeSize + padding) ,center - rangeSizeHalf)

			// get the ranges of each of the squareGuidesGroup
			for (var i = 0; i < 4; i++) {
				var currSquare = squareGuidesGroup.get(i).bbox();
				ranges.push([[currSquare.x, currSquare.cx + (currSquare.width / 2) ], [currSquare.y, currSquare.cy + (currSquare.height / 2)]]);
			}
		}

		/**
		 * render all the polygons
		 * @return {undefined}
		 */
		function renderPolygons() {
			for (var i = 0; i < numPolygons; i++) {
				polygonsGroup.polygon(genVertices(ranges))
					.style(polygonStyle)
					.style('fill', color);
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