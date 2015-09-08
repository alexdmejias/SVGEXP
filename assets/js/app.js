define(['svg', 'colors', 'header', 'eventsManager', 'modal'],
	function (SVG, Colors, Header, EvtsMgr, Modal) {
	'use strict';

	var App = {
		sel: {
			header: document.getElementsByTagName('header')[0],
			container: document.getElementById('container'),
			wrap: document.getElementsByClassName('wrap')[0],
			demoButtons: document.getElementsByClassName('demos')[0],
			controlButtons: document.getElementsByClassName('controls')[0],
		},
		currentAnimation : '',
		priorAnimation: '',
		defaultAnimation: 'Six',
		animations: {},
		viewportSize: {},
		numOfColorSchemes: Colors.length,
		debug: true,
		// modal: modal,

		setup: function () {
			App.viewportSize.width = document.documentElement.clientWidth;
			App.viewportSize.height = document.documentElement.clientHeight;

			App.sel.container.style.width = App.viewportSize.width + 'px';
			App.sel.container.style.height = App.viewportSize.height - App.sel.header.clientHeight - 4 + 'px';

			App.colorScheme = Colors[Math.floor(Math.random() * App.numOfColorSchemes)];

			// App.draw = SVG('container').fixSubPixelOffset();
			App.draw = SVG('container');
			App.parentGroup = App.draw.group().attr('class', 'parentGroup');

			App.currentAnimation = App.defaultAnimation;
		},

		demoSwitch: function (Demo) {
			var module = Demo.selectedDemo;

			App.priorAnimation = App.currentAnimation;
			App.currentAnimation = module;

			App.resetPrior();

			if (App.animations[module] !== undefined) {
				if(App.debug) console.log('App: module already loaded');
				App.animations[module].init();
				return;

			} else {
				require(['demos/demo' + module], function (ModuleObject) {

					if(App.debug) console.log('App: loading module', 'demos/demo'+module);

					App.animations[module] = ModuleObject(App);

					App.animations[module].init();
				});
			}

			ga('send', 'event', 'category', 'demoSwitch', App.currentAnimation);

		},

		resetPrior: function() {
			if(App.debug) console.log('App: sending reset command to', App.priorAnimation);

			var type = 'soft';

			if (App.priorAnimation !== App.currentAnimation) {
				type = 'hard';
			}

			if(App.animations[App.priorAnimation]) {
				App.animations[App.priorAnimation].reset(type);
			}
		},

		events: {
			resize: function() {
				App.sel.container.style.width = document.body.clientWidth + 'px';
				App.draw.style.width = document.body.clientWidth + 'px';
			}
		},

		bindEvents: function(object) {
			for(var e in App.events) {
				object.addEventListener(e, App.events[e])
			}
		},

		appinit: function () {
			App.bindEvents(window);
			App.setup();
			Header.init();
			Modal.init();
			EvtsMgr.subscribe('app/demoSwitch', App.demoSwitch);
			App.demoSwitch({selectedDemo: App.defaultAnimation})
		}

	};

	return App;

});
