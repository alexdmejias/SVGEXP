define([], function () {
	'use strict';
	return function (app) {
		return {
			num_points: 8,
			num_groups: 1,
			p: null,
			max: 500,
			iteration: 0,
			color: 'red',

			randomGen: function (max) {
				return Math.floor(Math.random() * max);
			},

			pointsMaker: function (num_points) {
				this.p = [];
				for(var i = 0; num_points > i; i++) {
					this.p.push([this.randomGen(this.max) ,this.randomGen(this.max)]);
				}
			},

			reset: function () {
				console.log('resetting animation a');
				app.parentGroup.clear();
			},

			drawShape: function (num_shapes) {
				var stroke = {
					'width': 0,
					'color': this.color
				};

				var translate = this.max * this.iteration;

				app.parentGroup.add(app.draw.group());
				this.pointsMaker(this.num_points);

				app.parentGroup.last().polygon([this.p[0], this.p[1], this.p[2], this.p[3]]).translate(translate).fill({'color': this.color, 'opacity': 0.16});
				app.parentGroup.last().polygon([this.p[0], this.p[1], this.p[5], this.p[6]]).translate(translate).fill({'color': this.color, 'opacity': 0.33});
				app.parentGroup.last().polygon([this.p[0], this.p[3], this.p[4], this.p[5]]).translate(translate).fill({'color': this.color, 'opacity': 0.50});
				app.parentGroup.last().polygon([this.p[2], this.p[3], this.p[4], this.p[6]]).translate(translate).fill({'color': this.color, 'opacity': 0.66});
				this.iteration++;
			},

			setupCanvas: function () {
				app.container.style.width = this.max + 'px';
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