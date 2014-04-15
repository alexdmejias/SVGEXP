define(['../helpers'], function (h) {
	'use strict';
	function demo(app) {
		var shape = {
				opacity: 0.55
			},
			colors = app.colorScheme,
			maxWidth = 400,
			widthOffset = 100,
			minHeight = 50,
			maxHeight = 100,
			leftPadding = 50,
			rightPadding = 50,
			globalTimer = null,
			newShapeDelay = 250,
			minShapeAnimateDelay = 1000,
			maxShapeAnimateDelay = 3000;

		function init() {
			setupCanvas();
			generator();
		}

		// resets the animation
		// @type kind of reset
		function reset(type) {
			var type = type || 'soft';
			if(app.debug) console.log('Three: resetting anim C');
			app.parentGroup.clear();
			h.stopTimer(globalTimer);
			if (type === 'hard') {
				console.warn('Three: hard reset');
			}
		}

		function setupCanvas() {
			h.setDrawWidth();
		}

		function genShape() {
			// TODO: fix
			var y = h.genRandom(app.viewportSize.height),
				shapeHeight = h.genRandom(minHeight, maxHeight),
				transitionTime = h.genRandom(minShapeAnimateDelay, maxShapeAnimateDelay),
				color = h.genRandom(colors.length - 1);

			app.parentGroup.polygon([
					[(app.viewportSize.width + rightPadding), y],
					[(rightPadding + maxWidth + app.viewportSize.width), y],
					[(rightPadding + maxWidth + widthOffset + app.viewportSize.width), (y + shapeHeight)],
					[(rightPadding + widthOffset + app.viewportSize.width), (y + shapeHeight)]
				])
				.style(shape)
				.style('fill', colors[color])
				.animate(transitionTime)
				.opacity(1)
				.x(-(maxWidth + widthOffset + leftPadding))
				.after(function () {
					this.remove();
				});
		}

		function generator() {
			globalTimer = window.setTimeout(function () {
				genShape();
				generator();
			}, newShapeDelay);
		}

		return {
			init: init,
			reset: reset
		}
	};

	return demo
});
