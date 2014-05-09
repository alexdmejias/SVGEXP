define(['eventsManager'],
	function (E) {

		function demoButtons(event) {
			var currentDemo = event.target.textContent;

			E.publish('app/demoSwitch', {
				selectedDemo: currentDemo
			});
		}

		function info(event) {
			event.preventDefault();

			E.publish('modal/show', {
				template: 'more-info'
			});

			ga('send', 'event', 'category', 'more_info');
		}

		function controls() {
			console.info('this will house the controls');
		}

		function init() {
			var buttons = document.getElementsByTagName('nav')[0];

			buttons.addEventListener('click', function(e) {

				switch(e.target.parentNode.className) {
					case 'controls':
						controls(e);
						break;
					case 'demos':
						console.log('demos');
						demoButtons(e);
						break;
					case 'title':
						info(e);
						console.log('title');
						break;
					default:
						console.log('huh?');
				}

			});

		}

		return {
			init: init
		}
	}
);