// TODO: make sure only one timer can be used
define(['../helpers'], function (h) {
	'use strict';
	return function (app) {
		return {
			l: 20, // length of shape side
			p: 5, // padding per shape
			horQ: null,
			verQ: null,
			margin: {
				top: 20,
				right: 20,
				bottom: 20,
				left: 20
			},
			shape : {
				fill: 'transparent'
			},
			stroke: {
				strokeWidth: 1
			},
			colors: app.colorScheme,
			lineAnimDuration: 500, // line animation duration
			newAnimDelay: 10, // time between new squares
			remainingCordinates: null,
			newShapeTimer: null,

			reset: function () {
				console.log('resetting anim B');
				h.stopTimer(this.newShapeTimer);
				app.parentGroup.clear();
			},

			setupCanvas: function () {
				h.drawWidth(document.documentElement.clientWidth);
			},

			calcMaxQuantity: function () {
				this.horQ = Math.floor((parseInt(app.container.style.width) - 50) / (this.p + this.l));
				this.verQ = Math.floor((parseInt(app.container.style.height) - 50) / (this.p + this.l));
			},

			// generates an array of cordinates for the loop to pick from
			genGrid: function (x, y) {
				var grid = [];
				for (var i = 0; x > i; i++) {
					for (var h = 0; y > h; h++) {
						grid.push([i, h]);
					}
				}
				this.remainingCordinates = grid;
			},

			// given an X and Y, it will create a square, it will then animate its stroke
			createSquare: function (x, y) {
				// clear the previous timer, should help with performance
				window.clearTimeout(this.newShapeTimer);

				// make the path
				app.parentGroup.path('M ' + (((this.l * x) + (this.p * x)) + 1) + ' ' + ((this.l * y) + (this.p * y) + 1) + 'H ' + ((this.l * (x + 1)) + (this.p * x)) + ' V ' + ((this.l * (y + 1)) + (this.p * y)) + 'H ' + (((this.l * x) + (this.p * x)) + 1) + 'Z')
					.style(this.shape);

				// define the length of the shape incase it hasnt already
				if (typeof this.shapeLength === 'undefined') {
					this.shapeLength = app.parentGroup.first().length();
				}

				var color = h.genRandom(this.colors.length - 1);

				app.parentGroup.last()
				.style({
					'fill': this.colors[color],
					'fill-opacity': 0,
					'stroke': this.colors[color],
					'stroke-width': this.stroke.strokeWidth,
					'stroke-dasharray' : this.shapeLength,
					'stroke-dashoffset': this.shapeLength,
				}).animate(this.lineAnimDuration)
				.style({
					'stroke-dashoffset': 0,
				})
				.after(function () {
					this.animate(this.lineAnimDuration)
					.style({
						'fill-opacity': 1
					});
				});

				// start a new timer for the next shape
				this.newShapeTimer = setTimeout(function () {
					app.animations.b.animationStart();
				}, this.newAnimDelay);
			},

			animationStart: function () {
				if (app.parentGroup.children().length < (this.horQ * this.verQ)) {

					var r = h.genRandom(this.remainingCordinates.length - 1);
					this.createSquare(this.remainingCordinates[r][0], this.remainingCordinates[r][1]);

					// remove the array element that was just used
					this.remainingCordinates.splice(r, 1);
				} else {
					// stop animation if there are no more cordinates left
					h.stopTimer(this.newShapeTimer);
				}
			},

			// style the parent box and start the whole animation
			init: function () {
				this.setupCanvas();
				this.calcMaxQuantity();
				this.genGrid(this.horQ, this.verQ);
				this.animationStart();
			}

		};
	};
});