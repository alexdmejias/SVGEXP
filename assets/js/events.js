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

						ga('send', 'event', 'category', 'switchDemo', currentDemo);

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

				ga('send', 'event', 'category', 'resetDemo', app.currentAnimation);
			},

			saveDemo: function () {
				app.modal.show('save-image');
				var content = btoa(app.container.innerHTML),
					innerModal = document.getElementsByClassName('modalForeground')[0],
					image = innerModal.getElementsByTagName('img')[0];

				image.setAttribute('src', 'data:image/svg+xml;base64,' + content);
				ga('send', 'event', 'category', 'saveDemo', currentDemo);

			},

			showControls: function () {
				app.modal.show('more-controls');
			},

			controls: function () {
				var self = this;
				app.controlButtons.addEventListener('click', function (e) {
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
			},

			moreInfo: function () {
				var infoButton = document.getElementsByClassName('moreInfo')[0];
				infoButton.addEventListener('click', function (e) {
					e.preventDefault();
					app.modal.show('more-info');
				}, true);
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