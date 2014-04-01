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

var app;

define(['app'], function (App) {
    // expose a global variable for easier debugging
    app = App;

    App.appinit();
});