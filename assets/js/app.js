define(['svg', 'events', 'colors', 'modal', 'demos/demo1', 'demos/demo2', 'demos/demo3', 'demos/demo4', 'demos/demo5'],
	function (SVG, events, colors, modal, demo1, demo2, demo3, demo4, demo5) {
	'use strict';

	var App = {
		header: document.getElementsByTagName('header')[0],
		container: document.getElementById('container'),
		wrap: document.getElementsByClassName('wrap')[0],
		demoButtons: document.getElementsByClassName('demos')[0],
		controlButtons: document.getElementsByClassName('controls')[0],
		currentAnimation : '',
		priorAnimation: '',
		defaultAnimation: 'b',
		animations: {},
		viewportSize: {},
		numOfColorSchemes: colors.colorSchemes.length,
		modal: modal,

		setup: function () {
			App.container.style.width = App.viewportSize.width + 'px';
			App.container.style.height = App.viewportSize.height - App.header.clientHeight - 4 + 'px';

			App.colorScheme = colors.colorSchemes[Math.floor(Math.random() * App.numOfColorSchemes)];

			App.draw = SVG('container').fixSubPixelOffset();
			App.parentGroup = App.draw.group().attr('class', 'parentGroup');
			App.animations.a = demo1(App);
			App.animations.b = demo2(App);
			App.animations.c = demo3(App);
			App.animations.d = demo4(App);
			App.animations.e = demo5(App);

			/*console.log(require.s.contexts._.defined);
			for (key in require.s.contexts._.defined) {
				if (key.indexOf('demos/') === 0) {
					App.animations.
				}
			};*/

		},
		appinit: function () {
			events(App).init();
			App.setup();

			App.priorAnimation = App.defaultAnimation;
			App.currentAnimation = App.defaultAnimation;
			App.animations[App.defaultAnimation].init();
		}

	};

	return App;

});
