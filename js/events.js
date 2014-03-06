define([], function() {
	return {
		init : function(elems, anims) {
			elems.addEventListener('click', function(e) {
				if(e.target.tagName == 'A') {
					demo = e.target.getAttribute('data-demo');

					anims[demo].init();
				}

			})
		}
	}
});