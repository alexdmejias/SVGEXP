define([], function () {
	'use strict';

	return function (app) {
		return {
			onResize: function () {
			},

			getViewportSize: function () {
				app.viewportSize = {
					width: document.documentElement.clientWidth,
					height: document.documentElement.clientHeight
				};
			},

			demoSwitch: function () {
				var self = this;

				app.demoButtons.addEventListener('click', function (e) {
					if (e.target.tagName === 'BUTTON') {

						var currentDemo = e.target.getAttribute('data-demo');

						app.priorAnimation = app.currentAnimation;
						app.currentAnimation = currentDemo;

						self.resetDemo();

						document.getElementsByTagName('body')[0].className = currentDemo;

					}
				});
			},

			resetDemo: function () {
				if (app.animations[app.priorAnimation].hasOwnProperty('reset')) {
					app.animations[app.priorAnimation].reset();
				} else {
					app.animations.demo.reset();
				}

				app.animations[app.currentAnimation].init();
			},

			controls: function () {
				var self = this;
				app.controlButtons.addEventListener('click', function (e) {
					if (e.target.tagName === 'BUTTON') {
						var action = e.target.getAttribute('data-action');

						switch (action) {
							case 'controls':
								console.log('will show controls at some point');
								break;
							default:
								console.log('will activate a reset method', this);
								self.resetDemo();
						}
					}
				});
			},

			moreInfo: function () {
				var infoButton = document.getElementsByClassName('moreInfo')[0];
				infoButton.addEventListener('click', function (e) {
					e.preventDefault();
					app.modal.show('more-info');
				});
			},

			init : function () {
				this.getViewportSize();
				this.demoSwitch();
				this.controls();
				this.moreInfo();
			}
		};
	};
});