define([], function() {
	'use strict';

	return {
		init : function(app) {
			console.log(app);
			app.buttons.addEventListener('click', function(e) {
				if(e.target.tagName == 'A') {
					demo = e.target.getAttribute('data-demo');

					body = document.getElementsByTagName('body')[0];
					body.className = demo;

					// if (typeof app.priorAnimation != 'undefined') {
					// 	app.animations[app.priorAnimation].reset()
					// }

					app.animations[demo].init();
				}

			});
		}
	};
});