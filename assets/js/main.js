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

var gApp;

define(['app'], function (App) {
    // expose a global variable dor easier testing
    gApp = App;

    App.appinit();
});