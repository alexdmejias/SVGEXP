define([], function () {
	'use strict';
	return function (app) {
		return {
			num_points: 8,
			num_groups: 1,
			p: [],
			max: 500,
			iteration: 0,
			color: 'red',

			draw: app.draw,
			parentGroup: app.parentGroup,

			randomGen: function (max) {
				return Math.floor(Math.random() * max);
			},

			pointsMaker: function (num_points) {
				p = [];
				for(var i = 0; num_points > i; i++) {
					p.push([this.randomGen(this.max) ,this.randomGen(this.max)]);
				}
			},

			stop: function () {
				console.log('stopping animation a');
			},

			drawShape: function (num_shapes) {
				var stroke = {
					'width': 0,
					'color': this.color
				};

				var translate = this.max * this.iteration;

				// this.parentGroup.width;

				this.parentGroup.add(this.draw.group());
				this.pointsMaker(this.num_points);

				this.parentGroup.last().polygon([p[0], p[1], p[2], p[3]]).translate(translate).fill({'color': this.color, 'opacity': 0.16});
				this.parentGroup.last().polygon([p[0], p[1], p[5], p[6]]).translate(translate).fill({'color': this.color, 'opacity': 0.33});
				this.parentGroup.last().polygon([p[0], p[3], p[4], p[5]]).translate(translate).fill({'color': this.color, 'opacity': 0.50});
				this.parentGroup.last().polygon([p[2], p[3], p[4], p[6]]).translate(translate).fill({'color': this.color, 'opacity': 0.66});
				this.iteration++;
			},

			setupCanvas: function () {
				var cont = document.getElementsByClassName('container')[0];
				cont.style.width = this.max + 'px';
			},

			init: function () {
				this.setupCanvas();

				// reset iteration from prior init()
				this.iteration = 0;
				// clear the parent group
				this.parentGroup.clear();

				for(var i = 0; this.num_groups > i; i++) {
					this.drawShape(4);
				}
			}
		};
	};
});