
var l = 10, // length of shape side
	p = 5, // padding per shape
	q = 20, // quantity per axis
	container_width = (l*q)+((q-1)*p), // width of the whole container
	line_anim_duration = 50, // line animation duration
	new_anim_delay = 50, // time between new squares
	cordinates_used = [],
	remaining_cordinates = [],
	timer,
	shape_length,
	parent_div = document.getElementsByClassName('container')[0];
	svg_elem = document.getElementsByTagName('svg')[0];
	draw = SVG(svg_elem).fixSubPixelOffset();
	group = draw.group();

// generates an array of cordinates for the loop to pick from
function genGrid(x,y) {
	for(var i = 0; x > i; i++) {
		for(var h = 0; y > h; h++) {
			remaining_cordinates.push([i,h])
		}
	}
}

// given an X and Y, it will create a square, it will then animate its stroke
function createSquare(x, y) {
		// clear the previous timer, should help with performance
		window.clearTimeout(timer);

		// make the path
		group.path('M '+(((l*x)+(p*x))+1)+' '+((l*y)+(p*y)+1)+'H '+((l*(x+1))+(p*x))+' V ' + ((l*(y+1))+(p*y))+'H '+(((l*x)+(p*x))+1)+'Z');

		// define the length of the shape incase it hasnt already
		if (typeof shape_length == "undefined"){
			shape_length = group.first().length();
		}

		group.last().attr({
			'fill': '#fff',
			'stroke' : 'red',
			'strokeWidth': 1,
			'stroke-dasharray' : shape_length,
			'stroke-dashoffset': shape_length
		}).animate(line_anim_duration).attr({
			'stroke-dashoffset': 0
		});

		// start a new timer for the next shape
		timer = setTimeout(animationStart, new_anim_delay);
}

function animationStart() {
	if (group.children().length < (q*q) ){
		r = Math.floor(Math.random() * remaining_cordinates.length);
		createSquare(remaining_cordinates[r][0], remaining_cordinates[r][1])

		// remove the array element that was just used
		remaining_cordinates.splice(r,1);
	} else {
		// stop animation if there are no more cordinates left
		animationStop();
	}
}

function animationStop() {
	window.clearTimeout(timer);
}

// style the parent box and start the whole animation
function init() {
	parent_div.style.width = container_width + 1 + "px";
	parent_div.style.height = container_width + 1 + "px";

	genGrid(q,q)
	animationStart()
}

init();