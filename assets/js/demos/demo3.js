define([], function () {
	'use strict';
	return function (app) {
		return {
			shape: {
				fill: 'red',
				opacity: 0.25
			},
			maxWidth: 400,
			widthOffset: 100,
			minHeight: 50,
			maxHeight: 100,
			leftPadding: 50,
			rightPadding: 50,
			newShapeTimer: null,
			newShapeDelay: 250,
			minShapeAnimateDelay: 1000,
			maxShapeAnimateDelay: 3000,

			reset: function () {
				console.log('resetting anim C');
				app.parentGroup.clear();
				this.stop();
			},

			stop: function () {
				window.clearTimeout(this.newShapeTimer);
			},

			setupCanvas: function () {
			},

			genRandInRange: function (min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},

			genShape: function () {
				// TODO: fix
				var y = this.genRandInRange(0, app.viewportSize.height),
					shapeHeight = this.genRandInRange(this.minHeight, this.maxHeight),
					transitionTime = this.genRandInRange(this.minShapeAnimateDelay, this.maxShapeAnimateDelay);

				gApp.parentGroup.polygon([
						[(app.viewportSize.width + this.rightPadding), y],
						[(this.rightPadding + this.maxWidth + app.viewportSize.width), y],
						[(this.rightPadding + this.maxWidth + this.widthOffset + app.viewportSize.width) , (y+shapeHeight)],
						[(this.rightPadding + this.widthOffset + app.viewportSize.width), (y + shapeHeight)]
					])
					.attr(this.shape)
					.animate(transitionTime)
					.opacity(1)
					.x(-(this.maxWidth + this.widthOffset + this.leftPadding) )
					.after( function () {
						this.remove();
					});
			},

			generator: function () {
				var self = this;
				this.newShapeTimer = window.setTimeout(function () {
					self.genShape();
					self.generator();
				}, this.newShapeDelay);
			},

			init: function () {
				this.setupCanvas();
				this.generator();
			}
		};
	};
});
