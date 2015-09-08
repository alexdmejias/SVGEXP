define(['eventsManager'],
	function (EvtsMgr) {
		'use strict';
		function demoButtons(event) {
			EvtsMgr.publish('app/demoSwitch', {
				selectedDemo: event.target.textContent
			});
		}

		function info() {
			EvtsMgr.publish('modal/show', {
				template: 'more-info'
			});

			ga('send', 'event', 'category', 'more_info');
		}

		function controls() {
			EvtsMgr.publish('modal/show', {
				template: 'more-controls'
			});

			ga('send', 'event', 'category', 'controls_show');
		}

		function init() {
			var buttons = document.getElementsByTagName('nav')[0];

			buttons.addEventListener('click', function(e) {
				e.preventDefault();
				switch(e.target.parentNode.className) {
					case 'controls':
						controls(e);
						break;
					case 'demos':
						demoButtons(e);
						break;
					case 'title':
						info(e);
						break;
					default:
						console.log('clicked the header');
				}

			});

		}

		return {
			init: init
		};
	}
);
