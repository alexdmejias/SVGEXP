'use strict';

define(function () {
	var subscribers = {};

	function subscribe(type, fn) {
		if (!subscribers[type]) {
			subscribers[type] = [];
		}

		if (subscribers[type].indexOf(fn) === -1) {
			subscribers[type].push(fn);
		}
		// console.log('subscribe', subscribers, type, fn);
	}

	function unsubscribe(type, fn) {
		var listeners = subscribers[type];

		if (!listeners) {
			return;
		}

		var index = listeners.indexOf(fn);

		if (index > -1) {
			listeners.splice(index, 1);
		}
		// console.log('unsubscribe', subscribers, type, fn);
	}

	function publish(type, evtObj) {
		if (!subscribers[type]) {
			return;
		}

		if (!evtObj.type) {
			evtObj.type = type;
		}

		var listeners = subscribers[type];

		for (var i = 0, l = listeners.length; i < l; i++) {
			listeners[i](evtObj);
		}
		// console.info('publish', subscribers, type, evtObj);
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe,
		publish: publish
	}
});