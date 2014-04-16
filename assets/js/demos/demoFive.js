/*shape moving along a path
fractals
perlin noise*/
define(['../helpers'], function (h) {
    'use strict';
    function demo (app) {
       var  l = 100, // length of shape side
            colors = app.colorScheme,
            remainingCordinates = null,
            gridMaxLength = 5,
            maxNumShapes = 10,
            minNumShapes = 6;

        // style the parent box and start the whole animation
        function init () {
            setupCanvas();
            remainingCordinates = h.genGrid(gridMaxLength / 2, gridMaxLength);
            render();
        }

        function reset () {
            console.log('resetting anim B');
            app.parentGroup.clear();
        }

        function setupCanvas () {
            var width = l * gridMaxLength,
                height = width;
            h.setDrawWidth(width, height);
        }

        // will create one square, given an array of coordinates and a color
        function createSquare (coords, color) {

            var rect = app.parentGroup.leftSide
                // .rect(l, l)
                .rect(l, l).radius(5)
                // .circle(l)
                .style('fill', color)
                .move(coords[0] * l, coords[1] * l);

        }

        function render () {
            var color = h.genRandom(colors.length - 1),
                // random number with the amount of shapes per side
                shapesAmount = h.genRandom(minNumShapes, maxNumShapes),
                // make the rightSide group
                rightSide = app.parentGroup.group().attr('class', 'rightSide');

            app.parentGroup.leftSide = app.parentGroup.group().attr('class', 'leftSide');

            for (var i = 0; i < shapesAmount; i++) {
                var r = h.genRandom(remainingCordinates.length - 1);
                createSquare(remainingCordinates[r], colors[color]);


                remainingCordinates.splice(r, 1);
            };

            // fill the rightSide group with an inversed reflection of the leftSide
            rightSide.use(app.parentGroup.leftSide).scale(-1, 1).move(l * gridMaxLength);

        }

        return {
            init: init,
            reset: reset
        }
    };

    return demo;
});