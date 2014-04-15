// idea: generate points in a clockwise way by providing a min/max range to the generator
define(['../helpers'], function (h) {
	'use strict';
	function demo(app) {

			// number of random points to generate
		var numPoints = 7,
			// placeholder for all the points
			p = null,
			// placeholder for all the polygons
			polygons = [],
			// max width of the overall shape
			shapeMaxWidth = 500,
			// possible colors
			colors = app.colorScheme,
			shadow = {
			style: {
				'opacity': 0.05,
				'filter': 'url(#shadow)'
			},
			height: 10,
			blur: {
				height: 50,
				blur: 2
			},
			yPos: 500,
			points: []
		};

		function init() {
			console.log('One: module one init');
			setupCanvas();

			// clear the current polygons array
			polygons = [];

			// clear the parent group
			app.parentGroup.clear();

			render();
			addShawdow();
		}

		function setupCanvas() {
			h.setDrawWidth(shapeMaxWidth, shapeMaxWidth + shadow.height);
		}

		function reset() {
			console.log('resetting animation A');
			app.parentGroup.clear();
		}

		function pointsMaker(numPoints) {
			p = [];
			for (var i = 0; i < numPoints; i++) {
				var x = h.genRandom(shapeMaxWidth),
					y = h.genRandom(shapeMaxWidth);
				p.push([x, y]);
			}
		}

		function render() {
			var color = h.genRandom(colors.length - 1);

			app.parentGroup.add(app.draw.group());
			pointsMaker(numPoints);

			// TODO: find a better way to do
			// polygons.push(app.parentGroup.last().polygon([p[0], p[1], p[2], p[3]]).fill({'color': colors[color], 'opacity': 0.35}));
			polygons.push(app.parentGroup.last().polygon([p[0], p[1], p[5], p[6]]).fill({'color': colors[color], 'opacity': 0.50}));
			polygons.push(app.parentGroup.last().polygon([p[0], p[1], p[4], p[5]]).fill({'color': colors[color], 'opacity': 0.75}));
			polygons.push(app.parentGroup.last().polygon([p[2], p[3], p[4], p[6]]).fill({'color': colors[color], 'opacity': 0.90}));

		}

		function addShawdow() {
			// set to defaults
			shadow.points = [shapeMaxWidth, 0];

			// get the lowest and higest x values
			for (var i = 0; i < p.length; i++) {
				var currentX = p[i][0];

				if (currentX < shadow.points[0]) {
					shadow.points[0] = currentX;
				}

				if (currentX > shadow.points[1]) {
					shadow.points[1] = currentX;
				}
			}

			var shadowElem = app.parentGroup.ellipse(shadow.points[1] - shadow.points[0], shadow.height)
				.move(shadow.points[0], shadow.yPos)
				.style(shadow.style);

			if (!document.getElementById('shadow')) {
				var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs'),
					filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter'),
					blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');

				filter.setAttribute('id', 'shadow');
				filter.setAttribute('height', shadow.blur.height);

				blur.setAttribute('in', 'SourceGraphic');
				blur.setAttribute('stdDeviation', shadow.blur.blur);

				document.getElementById(app.parentGroup).appendChild(defs).appendChild(filter).appendChild(blur);
			}
		}


		return {
			init: init,
			reset: reset
		};
	};

	return demo;
});