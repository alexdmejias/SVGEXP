define(['svg', 'events', 'demo1'], function(SVG, events, demo1) {
    var App = {
		draw : SVG(document.getElementsByTagName('svg')[0]).fixSubPixelOffset(),
		buttons: document.getElementsByClassName('demos')[0],
		currentAnimation : '',
		animations: {},

		setupNameSpaces: function() {
			App.parentGroup = App.draw.group();
			App.animations.a = demo1(App.draw, App.parentGroup);

		},
		appinit: function() {
			App.setupNameSpaces();
			events.init(App.buttons, App.animations);
		}

    }

    return App;

})