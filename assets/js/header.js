define(['eventsManager'],
	function (E) {

		function init() {
			// Find a better way to do this
			var demoButtons = document.getElementsByClassName('demos')[0];

			demoButtons.addEventListener('click', function (e) {
				if (e.target.tagName === 'BUTTON') {

					var currentDemo = e.target.getAttribute('data-demo');

					E.publish('app/demoSwitch', {
						selectedDemo: currentDemo
					});
				}
			});
		}

		return {
			init: init
		}
	}
);