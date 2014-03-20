requirejs.config({
    paths: {
        'svg': 'libs/svg.min'
    },
    shim: {
        'svg': {
            exports: 'SVG'
        }
    }
});

var gApp;

define(['svg', 'app'], function (SVG, App) {
    // expose a global variable dor easier testing
    gApp = App;

    App.appinit();
});