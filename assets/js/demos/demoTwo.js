define(['../helpers'], function (h) {
	'use strict';
	function demo(app) {

		var l = 20, // length of shape side
			p = 5, // padding per shape
			horQ = null,
			verQ = null,
			margin = {
				top: 20,
				right: 20,
				bottom: 20,
				left: 20
			},
			shape = {
				'fill': 'transparent',
				'fill-opacity': 0
			},
			stroke = {
				strokeWidth: 1
			},
			colors = app.colorScheme,
			lineAnimDuration = 500, // line animation duration
			newAnimDelay = 10, // time between new squares
			remainingCordinates = null,
			newShapeTimer = null;

		function init() {
			console.log('Two: module one init');
			setupCanvas();
			calcMaxQuantity();
			genGrid(horQ, verQ);
			animationStart();
		}

		function reset() {
			console.log('resetting anim B');
			h.stopTimer(newShapeTimer);
			app.parentGroup.clear();
		}

		function setupCanvas() {
			h.setDrawWidth(document.documentElement.clientWidth);
		}

		function calcMaxQuantity() {
			horQ = Math.floor((parseInt(app.sel.container.clientWidth) - 50) / (p + l));
			verQ = Math.floor((parseInt(app.sel.container.clientHeight) - 50) / (p + l));
		}

		// generates an array of cordinates for the loop to pick from
		function genGrid(x, y) {
			var grid = [];
			for (var i = 0; x > i; i++) {
				for (var h = 0; y > h; h++) {
					grid.push([i, h]);
				}
			}
			remainingCordinates = grid;
		}

		// given an X and Y, it will create a square, it will then animate its stroke
		function createSquare(coords) {
			var x = coords[0],
				y = coords[1]
			// make the path
			app.parentGroup.path('M ' + (((l * x) + (p * x)) + 1) + ' ' + ((l * y) + (p * y) + 1) + 'H ' + ((l * (x + 1)) + (p * x)) + ' V ' + ((l * (y + 1)) + (p * y)) + 'H ' + (((l * x) + (p * x)) + 1) + 'Z')
				.style(shape);

			// define the length of the shape incase it hasnt already
			if (typeof shapeLength === 'undefined') {
				var shapeLength = app.parentGroup.first().length();
			}

			var color = h.genRandom(colors.length - 1);

			app.parentGroup.last()
			.style({
				'fill': colors[color],
				'fill-opacity': 0,
				'stroke': colors[color],
				'stroke-width': stroke.strokeWidth,
				'stroke-dasharray' : shapeLength,
				'stroke-dashoffset': shapeLength,
			}).animate(lineAnimDuration)
			.style({
				'stroke-dashoffset': 0,
			})
			.after(function () {
				this.animate(lineAnimDuration)
				.style({
					'fill-opacity': 1
				});
			});

		}

		function loop() {
			// clear the previous timer, should help with performance
			window.clearTimeout(newShapeTimer);

			var r = h.genRandom(remainingCordinates.length - 1);
			createSquare(remainingCordinates[r]);

			newShapeTimer = setTimeout(function () {
				animationStart();
			}, newAnimDelay);

			remainingCordinates.splice(r, 1);
		}

		function animationStart() {
			if (app.parentGroup.children().length < (horQ * verQ)) {
				loop();
			} else {
				// stop animation if there are no more cordinates left
				h.stopTimer(newShapeTimer);
			}
		}

		return {
			init: init,
			reset: reset
		}

	};
	return demo;
});