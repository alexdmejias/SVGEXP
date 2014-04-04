requirejs.config({
    paths: {
        'svg': 'libs/svg.js/dist/svg.min'
    },
    shim: {
        'svg': {
            exports: 'SVG'
        }
    }
});

var x;

define(['app'], function (App) {
    // expose a global variable for easier debugging
    x = App;

    App.appinit();
});