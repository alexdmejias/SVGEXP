define([], function() {
	'use strict';

	return function(app) {
		return {
			getViewportSize: function() {
				app.viewportSize = {
					width: document.documentElement.clientWidth,
					height: document.documentElement.clientHeight
				};
			},

			demoSwitch: function() {
				app.buttons.addEventListener('click', function(e) {
					if(e.target.tagName == 'A') {

						var currentDemo = e.target.getAttribute('data-demo');

						app.priorAnimation = app.currentAnimation;

						if ((app.priorAnimation != currentDemo) && (app.priorAnimation !== '')) {
							app.animations[app.priorAnimation].reset();
						}

						document.getElementsByTagName('body')[0].className = currentDemo;

						app.animations[currentDemo].init();
						app.currentAnimation = currentDemo;
					}
				});
			},

			init : function() {
				this.getViewportSize();
				this.demoSwitch();
			}
		};
	};
});