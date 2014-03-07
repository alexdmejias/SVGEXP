define(['svg', 'events', 'demo1', 'demo2'], function(SVG, events, demo1, demo2) {
	'use strict';

    var App = {
		draw : SVG(document.getElementsByTagName('svg')[0]).fixSubPixelOffset(),
		buttons: document.getElementsByClassName('demos')[0],
		currentAnimation : null,
		priorAnimation: null,
		animations: {},

		setupNameSpaces: function() {
			App.parentGroup = App.draw.group();
			App.animations.a = demo1(App);
		},
		appinit: function() {
			App.setupNameSpaces();
			events.init(App);
		}

    };

    return App;

});