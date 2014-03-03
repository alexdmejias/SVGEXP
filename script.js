width = document.body.clientWidth;
l = 10;
p = 5;

q = 20;
line_anim_duration = 50;
new_anim_delay = 50;
cordinates_used = [];
remaining_cordinates = [];
var timer;
width = (l*q)+((q-1)*p);
var shape_length;


parent_div = document.getElementsByClassName('container')[0];

parent_div.style.width = width + 1 + "px";
parent_div.style.height = width + 1 + "px";

svg_elem = document.getElementsByTagName('svg')[0];

var draw = SVG(svg_elem).fixSubPixelOffset();
group = draw.group();
/*function randomCords(hMax, vMax) {
	return Array(Math.floor(Math.random() * hMax), Math.floor(Math.random() * vMax))
}*/

function genGrid(x,y) {
	for(var i = 0; x > i; i++) {
		for(var h = 0; y > h; h++) {
			remaining_cordinates.push(Array(i,h))
		}
	}
}


function createSquare(x, y) {
		window.clearTimeout(timer);

		// var cords_picked = x+''+y;
		// console.warn(cords_picked)
		// if (cordinates_used.indexOf(cords_picked) < 0) {
			group.path('M '+(((l*x)+(p*x))+1)+' '+((l*y)+(p*y)+1)+'H '+((l*(x+1))+(p*x))+' V ' + ((l*(y+1))+(p*y))+'H '+(((l*x)+(p*x))+1)+'Z').attr({
				'fill': '#fff',
				'stroke' : 'red',
				'strokeWidth': 1
			})

			if (typeof shape_length == "undefined"){
				shape_length = group.first().length();
			}

			group.last().attr({
				'stroke-dasharray' : shape_length,
				'stroke-dashoffset': shape_length
			}).animate(line_anim_duration).attr({
				'stroke-dashoffset': 0
			});
			// cordinates_used.push(cords_picked);
		// } else {
			// cords_to_use = randomCords(10,10);
			// createSquare(cords_to_use[0], cords_to_use[1]);
			console.info('new square')
		// }
		timer = setTimeout(kickoff, new_anim_delay);
}

function kickoff() {
	// var	r = randomCords(10,10);
	// if (remaining_cordinates.length < 1) {
	// 	genGrid(q,q)
	// }
	if (group.children().length < (q*q) ){
		r = Math.floor(Math.random() * remaining_cordinates.length);
		console.log(r);
		createSquare(remaining_cordinates[r][0], remaining_cordinates[r][1])
		remaining_cordinates.splice(r,1);
	} else {
		stop();
	}
}
function init() {
	if (remaining_cordinates.length < 1) {
		genGrid(q,q)
	}
	kickoff()
}

function stop() {
	window.clearTimeout(timer);
}

init();

// function animate(i,x,y) {
	// xPos = l * x
	// group.path('M1 1H '+((l*(i+1))+(p*i))+'V '+((l*(h+1))+(p*h))+'H '+(((l*i)+(p*i))+1)+'Z').attr({
	// 	'fill': '#ccc',
	// 	'stroke' : 'red',
	// 	'strokeWidth': 5
	// });
	// group.last().animate(1000).attr({
	// 	'stroke-dashoffset': 0
	// });
// }




























/*squares_left = [];
for (var i = 0; 30 > i; i ++) {
	for(var h = 0; 30 > h; h++) {
		group.path('M'+(((l*i)+(p*i))+1)+' '+ ((l*h)+(p*h)+1) +'H '+((l*(i+1))+(p*i))+'V '+((l*(h+1))+(p*h))+'H '+(((l*i)+(p*i))+1)+'Z').attr({
			'fill': '#fff',
			'stroke' : 'red',
			'strokeWidth': 5
		});
	}

	squares_left.push(i);
}
var length = group.first().length()
group.each(function() {
	this.attr({
	'stroke-dasharray' : length,
	'stroke-dashoffset': length
	})
});


function animate(i) {
	group.get(i).animate(1000).attr({
		'stroke-dashoffset': 0
	})
}

timer = setInterval(function() {
	if (squares_left.length > 0) {
		random = Math.floor(Math.random() * squares_left.length)
		animate(squares_left[random]);

		squares_left.splice(random, 1)
	} else {
		console.log('clearning timer');
		window.clearInterval(timer);
	}
}, 1000);
*/