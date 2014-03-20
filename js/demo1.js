define([], function () {
	'use strict';
	return function (app) {
		return {
			num_points: 8,
			num_groups: 1,
			p: null,
			shapeMaxWidth: 500,
			iteration: 0,
			color: 'red',
			colors: ['red', 'green', 'blue', 'black'],

			randomGen: function (shapeMaxWidth) {
				return Math.floor(Math.random() * shapeMaxWidth);
			},

			pointsMaker: function (num_points) {
				this.p = [];
				for(var i = 0; num_points > i; i++) {
					this.p.push([this.randomGen(this.shapeMaxWidth) ,this.randomGen(this.shapeMaxWidth)]);
				}
			},

			reset: function () {
				console.log('resetting animation A');
				app.parentGroup.clear();

				app.draw.style({
					'width': '100%'
				});
			},

			drawShape: function (num_shapes) {
				var color = Math.floor(Math.random() * this.colors.length);
				var translate = this.shapeMaxWidth * this.iteration;

				app.parentGroup.add(app.draw.group());
				this.pointsMaker(this.num_points);

				// TODO: find a better way to do this
				app.parentGroup.last().polygon([this.p[0], this.p[1], this.p[2], this.p[3]]).translate(translate).fill({'color': this.colors[color], 'opacity': 0.16});
				app.parentGroup.last().polygon([this.p[0], this.p[1], this.p[5], this.p[6]]).translate(translate).fill({'color': this.colors[color], 'opacity': 0.33});
				app.parentGroup.last().polygon([this.p[0], this.p[3], this.p[4], this.p[5]]).translate(translate).fill({'color': this.colors[color], 'opacity': 0.50});
				app.parentGroup.last().polygon([this.p[2], this.p[3], this.p[4], this.p[6]]).translate(translate).fill({'color': this.colors[color], 'opacity': 0.66});
				this.iteration++;
			},

			setupCanvas: function () {
				// app.container.style.width = this.shapeMaxWidth + 'px';
				app.draw.style({
					'width': this.shapeMaxWidth
				});
			},

			init: function () {
				this.setupCanvas();

				// reset iteration from prior init()
				this.iteration = 0;
				// clear the parent group
				app.parentGroup.clear();


				for(var i = 0; this.num_groups > i; i++) {
					this.drawShape(4);
				}
			}
		};
	};
});