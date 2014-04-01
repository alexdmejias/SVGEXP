define(['svg', 'events', 'colors', 'modal', 'demos/demo1', 'demos/demo2', 'demos/demo3', 'demos/demo4'],
	function (SVG, events, colors, modal, demo1, demo2, demo3, demo4) {
	'use strict';

	var App = {
		header: document.getElementsByTagName('header')[0],
		buttons: document.getElementById('demos'),
		container: document.getElementById('container'),
		currentAnimation : '',
		priorAnimation: '',
		animations: {},
		viewportSize: {},
		colorScheme: colors.colorSchemes[1],
		modal: modal,

		setupNameSpaces: function () {
			App.container.style.width = App.viewportSize.width + 'px';
			App.container.style.height = App.viewportSize.height - App.header.clientHeight - 4 + 'px';

			App.draw = SVG('container').fixSubPixelOffset();
			App.parentGroup = App.draw.group();
			App.animations.a = demo1(App);
			App.animations.b = demo2(App);
			App.animations.c = demo3(App);
			App.animations.d = demo4(App);

		},
		appinit: function () {
			events(App).init();
			App.setupNameSpaces();

			App.currentAnimation = 'd';
			App.animations[App.currentAnimation].init();
		}

	};

	return App;

});
