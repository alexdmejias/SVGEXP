define(['../helpers'], function (h) {
	'use strict';
	return function (app) {
		return {
			shape: {
				opacity: 0.55
			},
			colors: app.colorScheme,
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
				h.stopTimer(this.newShapeTimer);
			},

			setupCanvas: function () {
				h.drawWidth();
			},

			genShape: function () {
				// TODO: fix
				var y = h.genRandom(app.viewportSize.height),
					shapeHeight = h.genRandom(this.minHeight, this.maxHeight),
					transitionTime = h.genRandom(this.minShapeAnimateDelay, this.maxShapeAnimateDelay),
					color = h.genRandom(this.colors.length - 1);


				app.parentGroup.polygon([
						[(app.viewportSize.width + this.rightPadding), y],
						[(this.rightPadding + this.maxWidth + app.viewportSize.width), y],
						[(this.rightPadding + this.maxWidth + this.widthOffset + app.viewportSize.width), (y + shapeHeight)],
						[(this.rightPadding + this.widthOffset + app.viewportSize.width), (y + shapeHeight)]
					])
					.style(this.shape)
					.style('fill', this.colors[color])
					.animate(transitionTime)
					.opacity(1)
					.x(-(this.maxWidth + this.widthOffset + this.leftPadding))
					.after(function () {
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
