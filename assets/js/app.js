define(['svg', 'events', 'demo1', 'demo2', 'demo3'], function (SVG, events, demo1, demo2, demo3) {
	'use strict';

	var App = {
		header: document.getElementsByTagName('header')[0],
		buttons: document.getElementsByTagName('nav')[0],
		container: document.getElementById('container'),
		currentAnimation : 'a',
		priorAnimation: '',
		animations: {},
		viewportSize: {},

		setupNameSpaces: function () {
			App.container.style.width = App.viewportSize.width + 'px';
			App.container.style.height = App.viewportSize.height - App.header.clientHeight - 4 + 'px';

			App.draw = SVG('container').fixSubPixelOffset(),
			App.parentGroup = App.draw.group();
			App.animations.a = demo1(App);
			App.animations.b = demo2(App);
			App.animations.c = demo3(App);

		},
		appinit: function () {
			events(App).init();
			App.setupNameSpaces();

			App.animations.a.init();
		}

	};

	return App;

});