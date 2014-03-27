define([], function () {
    'use strict';
    return function (app) {
        return {
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
            newShapeDelay: 250,
            // placeholder for the timer var
            newShapeTimer: null,
            // the length of each shape
            shapeLength: 50,
            // how many boxes per grid side
            gridLength: 10,
            // placeholder for the coordinates
            gridCordinates: [],
            /*maxShapes: 3,*/
            placeShapesTimer: null,
            // placeholder for the current amount of shapes
            currShapeCount: 0,
            // maximum amount of shapes(triangles) to make
            maxShapesTotal: 100,

            reset: function () {
                console.log('resetting anim D');
                app.parentGroup.clear();
                this.currShapeCount = 0;
                window.clearTimeout(this.newShapeTimer);
                app.draw.style({
                    'width': '100%'
                });
            },

            stop: function () {
                window.clearTimeout(this.newShapeTimer);
            },

            setupCanvas: function () {
                app.draw.style({
                    'width': this.shapeLength * this.gridLength + 'px'
                });
            },

            genRandInRange: function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            genGrid: function () {
                var grid = [];
                for ( var i = 0; i < (this.maxShapesTotal); i++) {
                    grid.push([Math.floor(Math.random() * this.gridLength), Math.floor(Math.random() * this.gridLength), Math.floor(Math.random() * 4) * 90]);
                }

                this.gridCordinates = grid;
            },

            genShape: function () {
                var coords = this.gridCordinates[0];

                app.parentGroup.polygon([
                    [this.shapeLength * coords[0], coords[1] * this.shapeLength],
                    [this.shapeLength*(coords[0]+1), coords[1]*this.shapeLength],
                    [(coords[0]*this.shapeLength)+(this.shapeLength/2),(coords[1]*this.shapeLength)+(this.shapeLength/2)]
                ])
                .rotate(coords[2], (coords[0]*this.shapeLength)+(this.shapeLength/2),(coords[1]*this.shapeLength)+(this.shapeLength/2))
                .attr(this.shape.start)
                .animate()
                .attr(this.shape.end);

                this.gridCordinates.splice(0, 1);
            },

            genGridLines: function () {
                // group that wiil house grid lines
                var gridGroup = app.parentGroup.group().attr('clas','grid'),
                // cache of total line length
                    lineLength = this.gridLength * this.shapeLength,
                // how much time has to pass after the grid finished for the shapes to appear
                    timeAfterGrid = (this.gridLength * 100) + 500,
                    self = this;

                this.gridLineAttrs.dasharray = lineLength;
                this.gridLineAttrs.dashoffset = lineLength;

                for (var i = 0; i < this.gridLength + 1; i++) {
                    // horizontal lines
                    gridGroup.polyline([[0, this.shapeLength * i],[lineLength, this.shapeLength * i ]])
                    .stroke(this.gridLineAttrs);
                    // vertical lines
                    gridGroup.polyline([[this.shapeLength * i, 0],[this.shapeLength * i, lineLength ]])
                    .stroke(this.gridLineAttrs);
                }

                // animate each line
                gridGroup.each(function(i) {
                    this.animate(75 * i).stroke({'dashoffset': 0});
                });

                // call on the shapes generator to after the grid finished
                this.placeShapesTimer = window.setTimeout(function () {
                    self.generator.call(self);

                }, timeAfterGrid);

            },

            generator: function () {
                var self = this;
                if ((this.currShapeCount) < this.maxShapesTotal) {
                    this.newShapeTimer = window.setTimeout(function () {
                        self.genShape();
                        self.generator();
                    }, this.newShapeDelay);
                }
                this.currShapeCount++;
            },

            init: function () {
                this.setupCanvas();
                this.genGrid();
                this.genGridLines();
            }
        };
    };
});
