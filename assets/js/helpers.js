define([], function () {
    'use strict';
    return function () {
        return {
            stopTimer: function (timer) {
                window.clearTimeout(timer);
            },

            drawWidth: function (app, width) {
                app.draw.style({
                    'width': width
                });
            },

            genRandInRange: function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
        };
    };
});