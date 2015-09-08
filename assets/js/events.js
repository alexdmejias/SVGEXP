define([], function () {
	'use strict';
	function events(app) {

/*		function demoSwitch() {
			var self = this;

			app.sel.demoButtons.addEventListener('click', function (e) {
				if (e.target.tagName === 'BUTTON') {

					var currentDemo = e.target.getAttribute('data-demo');

					app.priorAnimation = app.currentAnimation;
					app.currentAnimation = currentDemo;

					self.loadDemo(currentDemo);

					ga('send', 'event', 'category', 'switchDemo', currentDemo);

					document.getElementsByTagName('body')[0].className = currentDemo;

				}
			});
		}*/

/*		function loadDemo(demo) {
			var module;
			if (module === 'loading') {
				return;
			}

			if (module === undefined) {
				module = 'loading';
				require(['demos/demo' + demo], function (ModuleObject) {
					console.log('loading a new module', 'demos/demo'+demo);
					module = new ModuleObject();
				});

			} else {
				module.init();
			}
		}

		function resetDemo() {
			if (app.animations[app.priorAnimation].hasOwnProperty('reset')) {
				app.animations[app.priorAnimation].reset();
			} else {
				app.animations.demo.reset();
			}

			app.animations[app.currentAnimation].init();

			ga('send', 'event', 'category', 'resetDemo', app.currentAnimation);
		}*/

		function saveDemo() {
			app.modal.show('save-image');
			var content = btoa(app.container.innerHTML),
				innerModal = document.getElementsByClassName('modalForeground')[0],
				image = innerModal.getElementsByTagName('img')[0];

			image.setAttribute('src', 'data:image/svg+xml;base64,' + content);
			ga('send', 'event', 'category', 'saveDemo', currentDemo);

		}

		function showControls() {
			app.modal.show('more-controls');
		}

		function controls() {
			var self = this;
			app.sel.controlButtons.addEventListener('click', function (e) {
				if (e.target.tagName === 'BUTTON') {
					var action = e.target.getAttribute('data-action');

					switch (action) {
						case 'controls':
							console.log('will show controls at some point');
							self.showControls();
							break;
						case 'save':
							console.log('saving demo');
							self.saveDemo();
							break;
						default:
							self.resetDemo();
					}
				}
			});
		}

/*		function moreInfo() {
			var infoButton = document.getElementsByClassName('moreInfo')[0];
			infoButton.addEventListener('click', function (e) {
				e.preventDefault();
				app.modal.show('more-info');
			}, true);
		}*/

		function bindEvents() {
			console.log('wasd');
			window.addEventListener('resize', function(event){
			  console.log('wasd');
			});
		}

		function init () {
			// this.getViewportSize();
			// this.demoSwitch();
			// this.controls();
			// this.moreInfo();
			this.bindEvents();
			// this.loadDemo(app.defaultAnimation)
		}

		return {
			init: init
		}
	}

	return events;
});