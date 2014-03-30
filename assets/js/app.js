define(['svg', 'events', 'helpers', 'demos/demo1', 'demos/demo2', 'demos/demo3', 'demos/demo4'],
	function (SVG, events, helpers, demo1, demo2, demo3, demo4) {
	'use strict';

	var App = {
		header: document.getElementsByTagName('header')[0],
		buttons: document.getElementsByTagName('nav')[0],
		container: document.getElementById('container'),
		currentAnimation : '',
		priorAnimation: '',
		animations: {},
		viewportSize: {},

		setupNameSpaces: function () {
			App.container.style.width = App.viewportSize.width + 'px';
			App.container.style.height = App.viewportSize.height - App.header.clientHeight - 4 + 'px';

			App.draw = SVG('container').fixSubPixelOffset(),
			App.parentGroup = App.draw.group();
			App.animations.a = demo1(App, helpers);
			App.animations.b = demo2(App, helpers);
			App.animations.c = demo3(App, helpers);
			App.animations.d = demo4(App, helpers);

		},
		appinit: function () {
			events(App).init();
			App.setupNameSpaces();

			App.currentAnimation = 'c';
			App.animations[App.currentAnimation].init();
		}

	};

	return App;

});
