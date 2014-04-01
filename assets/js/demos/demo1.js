// idea: generate points in a clockwise way by providing a min/max range to the generator
define(['../helpers'], function (h) {
	'use strict';
	return function (app) {
		return {
			// number of random points to generate
			numPoints: 7,
			// placeholder for all the points
			p: null,
			// placeholder for all the polygons
			polygons: [],
			// max width of the overall shape
			shapeMaxWidth: 500,
			// possible colors
			colors: app.colorScheme,
			shadow: {
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
			},

			pointsMaker: function (numPoints) {
				this.p = [];
				for (var i = 0; i < numPoints; i++) {
					var x = h.genRandom(this.shapeMaxWidth),
						y = h.genRandom(this.shapeMaxWidth);
					this.p.push([x, y]);
				}
			},

			reset: function () {
				console.log('resetting animation A');
				app.parentGroup.clear();

				h.drawWidth();
			},

			drawShape: function () {
				var color = h.genRandom(this.colors.length - 1);

				app.parentGroup.add(app.draw.group());
				this.pointsMaker(this.numPoints);

				// TODO: find a better way to do this
				this.polygons.push(app.parentGroup.last().polygon([this.p[0], this.p[1], this.p[2], this.p[3]]).fill({'color': this.colors[color], 'opacity': 0.35}));
				this.polygons.push(app.parentGroup.last().polygon([this.p[0], this.p[1], this.p[5], this.p[6]]).fill({'color': this.colors[color], 'opacity': 0.50}));
				this.polygons.push(app.parentGroup.last().polygon([this.p[0], this.p[1], this.p[4], this.p[5]]).fill({'color': this.colors[color], 'opacity': 0.75}));
				this.polygons.push(app.parentGroup.last().polygon([this.p[2], this.p[3], this.p[4], this.p[6]]).fill({'color': this.colors[color], 'opacity': 0.90}));

			},

			addShawdow: function () {
				// set to defaults
				this.shadow.points = [this.shapeMaxWidth, 0];

				// get the lowest and higest x values
				for (var i = 0; i < this.p.length; i++) {
					var currentX = this.p[i][0];

					if (currentX < this.shadow.points[0]) {
						this.shadow.points[0] = currentX;
					}

					if (currentX > this.shadow.points[1]) {
						this.shadow.points[1] = currentX;
					}
				}

				this.shadowElem = app.parentGroup.ellipse(this.shadow.points[1] - this.shadow.points[0], this.shadow.height)
					.move(this.shadow.points[0], this.shadow.yPos)
					.style(this.shadow.style);

				if (!document.getElementById('shadow')) {
					var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs'),
						filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter'),
						blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');


					filter.setAttribute('id', 'shadow');
					filter.setAttribute('height', this.shadow.blur.height);

					blur.setAttribute('in', 'SourceGraphic');
					blur.setAttribute('stdDeviation', this.shadow.blur.blur);

					document.getElementById(app.parentGroup).appendChild(defs).appendChild(filter).appendChild(blur);
				}
			},

			setupCanvas: function () {
				h.drawWidth(this.shapeMaxWidth);
			},

			init: function () {
				this.setupCanvas();

				// clear the current polygons array
				this.polygons = [];

				// clear the parent group
				app.parentGroup.clear();

				this.drawShape();
				this.addShawdow();
			}
		};
	};
});