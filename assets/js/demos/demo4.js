'use strict';
define(['../helpers'], function (h) {
    return function (app) {
        return {
            colors: app.colorScheme,
            shape: {
                start: {
                    opacity: 0
                },
                end: {
                    opacity: 0.5
                }
            },
            gridLineAttrs: {
                width: 1,
                color: '#bbb'
            },
            // amount of time between new shapes being generated
            newShapeDelay: 50,
            // placeholder for the timer var
            globalTimer: null,
            // the length of each shape
            shapeLength: 50,
            // how many boxes per grid side
            gridLength: 10,
            // placeholder for the coordinates
            gridCordinates: [],
            // grid ids placeholder
            gridCordinatesIds: [],
            /*maxShapes: 3,*/
            placeShapesTimer: null,
            // placeholder for the current amount of shapes
            currShapeCount: 0,
            // maximum amount of shapes(triangles) to make
            maxShapesTotal: 400,

            reset: function () {
                console.log('resetting anim D');
                app.parentGroup.clear();
                this.currShapeCount = 0;
                this.gridCordinatesIds = [];
                h.stopTimer(this.globalTimer);
            },

            setupCanvas: function () {
                var width = this.shapeLength * this.gridLength,
                    height = width;
                h.drawWidth(width, height);
            },

            genCoordinate: function () {
                var yRand = h.genRandom(this.gridLength - 1);
                var xRand = h.genRandom(this.gridLength - 1);
                var angle = h.genRandom(3) * 90;

                return [xRand, yRand, angle];

            },

            genId: function (coords) {
                return coords.join('');
            },

            // draw one of the shapes using one of the grid coordinates
            genShape: function (coords) {
                // var colors= ['green', 'red', 'black'];
                app.parentGroup.polygon([
                    [this.shapeLength * coords[0], coords[1] * this.shapeLength],
                    [this.shapeLength * (coords[0] + 1), coords[1] * this.shapeLength],
                    [(coords[0] * this.shapeLength) + (this.shapeLength / 2), (coords[1] * this.shapeLength) + (this.shapeLength / 2)]
                ])
                .rotate(coords[2], (coords[0] * this.shapeLength) + (this.shapeLength / 2), (coords[1] * this.shapeLength) + (this.shapeLength / 2))
                // .attr(this.shape.start)
                .style({
                    fill: this.colors[h.genRandom(4)],
                    opacity: 0
                })
                .attr('class', coords.join(''))
                .animate()
                // .attr(this.shape.end);
                .style({
                    opacity: 1
                });

            },

            // draw the grid lines
            genGridLines: function () {
                // group that wiil house grid lines
                var gridGroup = app.parentGroup.group().attr('clas', 'grid'),
                // cache of total line length
                    lineLength = this.gridLength * this.shapeLength,
                // how much time has to pass after the grid finished for the shapes to appear
                    timeAfterGrid = (this.gridLength * 100) + 500,
                    self = this;

                this.gridLineAttrs.dasharray = lineLength;
                this.gridLineAttrs.dashoffset = lineLength;

                for (var i = 0; i < this.gridLength + 1; i++) {
                    // horizontal lines
                    gridGroup.polyline([[0, this.shapeLength * i], [lineLength, this.shapeLength * i ]])
                    .stroke(this.gridLineAttrs);
                    // vertical lines
                    gridGroup.polyline([[this.shapeLength * i, 0], [this.shapeLength * i, lineLength ]])
                    .stroke(this.gridLineAttrs);
                }

                // animate each line
                gridGroup.each(function (i) {
                    this.animate(75 * i).stroke({'dashoffset': 0});
                });

                // call on the shapes generator to after the grid finished
                this.placeShapesTimer = window.setTimeout(function () {
                    self.generator.call(self);

                }, timeAfterGrid);

            },

            loop: function () {
                var coords = this.genCoordinate();
                var id = this.genId(coords);

                if (this.gridCordinatesIds.indexOf(id) === -1) {
                    this.genShape(coords);
                    this.gridCordinatesIds.push(id);
                    this.currShapeCount++;
                    this.generator();
                } else {
                    this.loop();
                }


            },

            generator: function () {
                var self = this;
                if ((this.currShapeCount) < this.maxShapesTotal) {
                    this.globalTimer = window.setTimeout(function () {
                        self.loop();
                    }, this.newShapeDelay);
                }
            },

            init: function () {
                this.setupCanvas();
                this.genGridLines();
            }
        };
    };
});
