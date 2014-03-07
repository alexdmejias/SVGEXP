define([], function () {
	'use strict';
	return function (app) {
		return {
			l: 20, // length of shape side
			p: 5, // padding per shape
			horQ: null,
			verQ: null,
			lineAnimDuration: 50, // line animation duration
			newAnimDelay: 50, // time between new squares
			remainingCordinates: null,
			newShapeTimer: null,
			shapeLength: null,

			calcMaxQuantity: function () {
				this.horQ = app.viewportSize.x / (this.p + this.l);
				this.verQ = app.viewportSize.y / (this.p + this.l);
			},

			setupCanvas: function () {
				app.container.style.width = app.viewportSize.x + 1 + 'px';
				app.container.style.height = app.viewportSize.y + 1 + 'px';
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
					app.parentGroup.path('M ' + (((this.l * x) + (this.p * x)) + 1) + ' ' + ((this.l * y) + (this.p * y) + 1) + 'H ' + ((this.l * (x + 1)) + (this.p * x)) + ' V ' + ((this.l * (y + 1)) + (this.p * y)) + 'H ' + (((this.l * x) + (this.p * x)) + 1) + 'Z');

					// define the length of the shape incase it hasnt already
					if (typeof this.shapeLength == 'undefined'){
						this.shapeLength = app.parentGroup.first().length();
					}

					app.parentGroup.last().attr({
						'fill': '#fff',
						'stroke' : 'red',
						'strokeWidth': 1,
						'stroke-dasharray' : this.shapeLength,
						'stroke-dashoffset': this.shapeLength
					}).animate(this.lineAnimDuration).attr({
						'stroke-dashoffset': 0
					});

					// start a new timer for the next shape
					this.newShapeTimer = setTimeout(function() {
						app.animations.b.animationStart();
					}, this.newAnimDelay);
			},

			animationStart: function () {
				if (app.parentGroup.children().length < ( this.horQ * this.verQ) ){

					var r = Math.floor(Math.random() * this.remainingCordinates.length);
					this.createSquare(this.remainingCordinates[r][0], this.remainingCordinates[r][1]);

					// remove the array element that was just used
					this.remainingCordinates.splice(r,1);
				} else {
					// stop animation if there are no more cordinates left
					this.animationStop();
				}
			},

			animationStop: function () {
				window.clearTimeout(this.newShapeTimer);
			},


			reset: function() {
				console.log('resetting anim B');
				this.animationStop();
				app.parentGroup.clear();
			},

			// style the parent box and start the whole animation
			init: function() {
				this.calcMaxQuantity();
				this.setupCanvas();
				this.genGrid(this.horQ, this.verQ);
				this.animationStart();
			}

		};
	};
});