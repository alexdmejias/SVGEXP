'use strict';
define([], function () {
	return {
		created: false,
		visible: false,
		bgElem: null,
		fgElem: null,
		create: function () {
			this.bgElem = document.createElement('div');
			this.bgElem.setAttribute('id', 'modalBackground');
			document.getElementsByTagName('body')[0].appendChild(this.bgElem);

			this.fgElem = document.createElement('div');
			this.fgElem.setAttribute('id', 'modalForeground');
			document.getElementById('modalBackground').appendChild(this.fgElem);

		},

		events: function () {
			var elem = this.bgElem;
			var hide = function () {
				elem.className = '';
			};

			this.bgElem.addEventListener('click', hide);

		},

		init: function () {
			if (!this.created) {
				this.create();
				this.created = true;
			}

			this.events();
		},

		clear: function () {
			while (this.fgElem.firstChild) {
				this.fgElem.removeChild(this.fgElem.firstChild);
			}

			return this;
		},

		show: function (template) {
			this.init();

			this.clear();
			if (typeof(template) !== 'undefined') {
				this.fgElem.innerHTML = document.getElementById(template + '-template').innerHTML;
			}

			this.bgElem.className = 'showing';

			return this;
		},

		text: function (text) {
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
		}
	};
});