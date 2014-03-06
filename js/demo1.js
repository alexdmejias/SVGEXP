define([], function() {
	return function(draw, parentGroup) {
		return {
			num_points: 8,
			num_groups: 5,
			p: [],
			max: 200,
			iteration: 0,
			color: 'blue',

			draw: draw,
			parentGroup: parentGroup,

			randomGen: function(max) {
				return Math.floor(Math.random() * max);
			},

			pointsMaker: function(num_points) {
				p = [];
				for(var i = 0; num_points > i; i++) {
					p.push([this.randomGen(this.max) ,this.randomGen(this.max)])
				}
			},

			stop: function() {
				console.log('stopping animation a')
			},

			drawShape: function(num_shapes) {
				var stroke = {
					'width':1,
					'color': this.color
				};

				var translate = this.max * this.iteration;

				this.parentGroup.add(this.draw.group());
				this.pointsMaker(this.num_points);

				this.parentGroup.last().polygon([p[0], p[1], p[2], p[3]]).translate(translate).fill({'color': this.color, 'opacity': 0.16}).stroke(stroke)
				this.parentGroup.last().polygon([p[0], p[1], p[5], p[6]]).translate(translate).fill({'color': this.color, 'opacity': 0.33}).stroke(stroke)
				this.parentGroup.last().polygon([p[0], p[3], p[4], p[5]]).translate(translate).fill({'color': this.color, 'opacity': 0.50}).stroke(stroke)
				this.parentGroup.last().polygon([p[2], p[3], p[4], p[6]]).translate(translate).fill({'color': this.color, 'opacity': 0.66}).stroke(stroke)
				this.iteration++;
			},

			init: function() {
				// reset iteration from prior init()
				this.iteration = 0;
				// clear the parent group
				this.parentGroup.clear();

				for(var i = 0; this.num_groups > i; i++) {
					this.drawShape(4);
				}
			}
		}
	};
})