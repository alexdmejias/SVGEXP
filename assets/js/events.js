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
					if (e.target.tagName === 'A') {

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
					app.modal.show().text(['Please excuse the apperance while I keep working on this project.',
						'What is this? A series of SVG elements, please look at the GitHub repo to find what else is coming to this project']);
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