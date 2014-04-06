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
				app.buttons.addEventListener('click', function (e) {
					if (e.target.tagName === 'BUTTON') {

						var currentDemo = e.target.getAttribute('data-demo');

						app.priorAnimation = app.currentAnimation;

						app.animations[app.priorAnimation].reset();

						document.getElementsByTagName('body')[0].className = currentDemo;

						app.animations[currentDemo].init();
						app.currentAnimation = currentDemo;

					}
				});
			},

			moreInfo: function () {
				var infoButton = document.getElementById('info');
				infoButton.addEventListener('click', function (e) {
					e.preventDefault();
					app.modal.show('more-info');
				});
			},

			init : function () {
				this.getViewportSize();
				this.demoSwitch();
				this.moreInfo();
			}
		};
	};
});