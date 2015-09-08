'use strict';
define(['eventsManager'], function (EvtsMgr) {
	var Modal = {
		created: false,
		visible: false,
		bgElem: null,
		fgElem: null,
		create: function () {
			Modal.bgElem = document.createElement('div');
			Modal.bgElem.setAttribute('class', 'modal');
			document.getElementsByTagName('body')[0].appendChild(Modal.bgElem);

			Modal.fgElem = document.createElement('div');
			Modal.fgElem.setAttribute('class', 'modalForeground');

			Modal.bgElem.appendChild(Modal.fgElem);

		},

		events: {
			hide: {
				trigger: 'click',
				handler: function(e) {
					if (e.target.className === 'modal showing') {
						Modal.bgElem.className = 'modal';
					}
				}
			}
		},

		bindEvents: function(object) {
			for (var e in Modal.events) {
				object.addEventListener(Modal.events[e].trigger, Modal.events[e].handler, object)
			}

			return object
		},

		init: function () {
			if (!Modal.created) {
				Modal.create();
				Modal.created = true;
			}

			Modal.bindEvents(Modal.bgElem);

			EvtsMgr.subscribe('modal/show', this.show);
		},

		/**
		 * removed all the children from the foreground element
		 * @return {this} the modal object
		 */
		clear: function () {
			while (this.fgElem.firstChild) {
				this.fgElem.removeChild(this.fgElem.firstChild);
			}
			return this;
		},

		show: function (template) {
			// delete every from the modal before showing it again
			Modal.clear();

			if (typeof(template) !== 'undefined') {
				Modal.fgElem.innerHTML = document.getElementById(template.template + '-template').innerHTML;
			}

			Modal.bgElem.className = 'modal showing';

			return this;
		},

		/**
		 * add a paragraph of text to the modal, currently not being used
		 * @param  {string | array} text string/array to display in the foreground elem.
		 * @return {this} the modal element
		 */
		/*text: function (text) {
			this.clear();

			if (typeof(text) === 'string') {
				this.fgElem.innerHTML = '<p>' + text + '</p>';
			} else {
				for (var par in text ) {
					var p = document.createElement('p');
					p.innerHTML = text[par];
					this.fgElem.appendChild(p);
				}
			}

			return this;
		}*/
	};

	return Modal;
});
