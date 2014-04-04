/*demo5
either a shape moving along a path
avatar creator like space invaders where one half of the canvas is replicated to the other side
fractals
perlin noise*/
define(['../helpers'], function (h) {
    'use strict';
    return function (app) {
        return {
            l: 50, // length of shape side
            colors: app.colorScheme,
            remainingCordinates: null,
            gridMaxLength: 10,
            maxNumShapes: 25,
            minNumShapes: 10,

            reset: function () {
                console.log('resetting anim B');
                app.parentGroup.clear();
            },

            setupCanvas: function () {
                var width = this.l * this.gridMaxLength,
                    height = width;
                h.drawWidth(width, height);
            },

            // generates an array of cordinates for the loop to pick from
            genGrid: function (x, y) {
                var grid = [];
                for (var i = 0; x > i; i++) {
                    for (var h = 0; y > h; h++) {
                        grid.push([i, h]);
                    }
                }
                this.remainingCordinates = grid;
            },

            // will create one square, given an array of coordinates and a color
            createSquare: function (coords, color) {

                var rect = app.parentGroup.leftSide
                    // .rect(this.l, this.l)
                    .rect(this.l, this.l).radius(5)
                    // .circle(this.l)
                    .style('fill', color)
                    .move(coords[0] * this.l, coords[1] * this.l);

            },

            render: function () {
                var color = h.genRandom(this.colors.length - 1),
                    // random number with the amount of shapes per side
                    shapesAmount = h.genRandom(this.minNumShapes, this.maxNumShapes),
                    // make the rightSide group
                    rightSide = app.parentGroup.group().attr('class', 'rightSide');

                app.parentGroup.leftSide = app.parentGroup.group().attr('class', 'leftSide');

                for (var i = 0; i < shapesAmount; i++) {
                    var r = h.genRandom(this.remainingCordinates.length - 1);
                    this.createSquare(this.remainingCordinates[r], this.colors[color]);


                    this.remainingCordinates.splice(r, 1);
                };

                // fill the rightSide group with an inversed reflection of the leftSide
                rightSide.use(app.parentGroup.leftSide).scale(-1, 1).move(this.l * this.gridMaxLength);

            },

            // style the parent box and start the whole animation
            init: function () {
                this.setupCanvas();
                this.genGrid(this.gridMaxLength / 2, this.gridMaxLength);
                this.render();
            }

        };
    };
});