// idea: put a shadow at the bottom of the shape
// idea: generate points in a clockwise way by providing a min/max range to the generator
define([], function () {
	'use strict';
	return function (app) {
		return {
			// number of random points to generate
			num_points: 7,
			// placeholder for all the points
			p: null,
			// placeholder for all the polygons
			polygons: [],
			shapeMaxWidth: 500,
			// possible colors
			colors: ['red', 'green', 'blue', 'black'],
			shadow: {
				style: {
					'opacity': 0.05
				},
				height: 50,
				blur: 2,
				yPos: 500,
				points: []
			},

			randomGen: function (shapeMaxWidth) {
				return Math.floor(Math.random() * shapeMaxWidth);
			},

			pointsMaker: function (num_points) {
				this.p = [];
				for(var i = 0; i < num_points; i++) {
					var x = this.randomGen(this.shapeMaxWidth),
						y = this.randomGen(this.shapeMaxWidth);
					this.p.push([x ,y]);
				}
			},

			reset: function () {
				console.log('resetting animation A');
				app.parentGroup.clear();

				app.draw.style({
					'width': '100%'
				});
			},

			drawShape: function () {
				var color = Math.floor(Math.random() * this.colors.length);

				app.parentGroup.add(app.draw.group());
				this.pointsMaker(this.num_points);

				// TODO: find a better way to do this
				this.polygons.push(app.parentGroup.last().polygon([this.p[0], this.p[1], this.p[2], this.p[3]]).fill({'color': this.colors[color], 'opacity': 0.35}));
				this.polygons.push(app.parentGroup.last().polygon([this.p[0], this.p[1], this.p[5], this.p[6]]).fill({'color': this.colors[color], 'opacity': 0.50}));
				this.polygons.push(app.parentGroup.last().polygon([this.p[0], this.p[1], this.p[4], this.p[5]]).fill({'color': this.colors[color], 'opacity': 0.75}));
				this.polygons.push(app.parentGroup.last().polygon([this.p[2], this.p[3], this.p[4], this.p[6]]).fill({'color': this.colors[color], 'opacity': 0.90}));

			},

			addShawdow: function() {
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


				// TODO: Add shadow blur
			},

			setupCanvas: function () {
				app.draw.style({
					'width': this.shapeMaxWidth
				});
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