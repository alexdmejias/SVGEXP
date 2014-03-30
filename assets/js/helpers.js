define(function () {
    'use strict';
    return {
        stopTimer: function (timer) {
            window.clearTimeout(timer);
        },

        drawWidth: function (width) {
            if (typeof(width) === 'undefined') {
                width = '100%';
            } else {
                width = width + 'px'
            }
            document.getElementById('container').style.width = width;
        },

        genRandom: function (min, max) {
            if (typeof(max) === 'undefined') {
                max = min;
                min = 0;
            }

            return Math.floor(Math.random() * (max - min + 1)) + min;

        }
    };

});