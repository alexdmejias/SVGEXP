define([], function () {
    'use strict';
    return function (app) {
        return {
            shape: {
                opacity: 0.5
            },
            grid: {
                width: 1,
                color: '#ddd'
            },
            newShapeDelay: 250,
            shapeWidth: 50,
            gridLength: 10,
            maxShapes: 3,
            newShapeTimer: null,
            currShapeCount: 0,
            maxShapesTotal: 5,

            reset: function () {
                app.parentGroup.clear();
                window.clearTimeout(this.newShapeTimer);
            },

            stop: function () {
                window.clearTimeout(this.newShapeTimer);
            },

            setupCanvas: function () {
            },

            genRandInRange: function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            genShape: function () {
                var xPos = Math.floor(Math.random() * this.gridLength);
                var yPos = Math.floor(Math.random() * this.gridLength);
                var translate = Math.floor(Math.random() * 4) * 90;

                app.parentGroup.polygon([
                    [this.shapeWidth * xPos, yPos * this.shapeWidth],
                    [this.shapeWidth*(xPos+1), yPos*this.shapeWidth],
                    [(xPos*this.shapeWidth)+(this.shapeWidth/2),(yPos*this.shapeWidth)+(this.shapeWidth/2)]
                ])
                .rotate(translate, (xPos*this.shapeWidth)+(this.shapeWidth/2),(yPos*this.shapeWidth)+(this.shapeWidth/2))
                .style({
                    'fill': 'blue'
                })
                .animate(1000)
                .style({
                    'fill': 'yellow'
                })
            },

            genGrid: function () {
                var grid = app.parentGroup.group().attr('clas','grid');

                for (var i = 0; i < this.gridLength + 1; i++) {
                    // horizontal lines
                    grid.polyline([[0, this.shapeWidth * i],[this.gridLength * this.shapeWidth, this.shapeWidth * i ]]).stroke(this.grid)
                    // vertical lines
                    grid.polyline([[this.shapeWidth * i, 0],[this.shapeWidth * i, this.gridLength * this.shapeWidth ]]).stroke(this.grid)
                    // diagonal left to right
                    grid.polyline([[this.shapeWidth * i, 0],[this.shapeWidth * i, this.gridLength * this.shapeWidth ]]).stroke(this.grid)
                }
            },

            generator: function () {
                var self = this;
                if ((this.currShapeCount + 1) < this.maxShapesTotal) {
                    this.newShapeTimer = window.setTimeout(function () {
                        self.genShape();
                        self.generator();
                        self.currShapeCount++;
                    }, this.newShapeDelay);
                }
            },

            init: function () {
                this.setupCanvas();
                this.genGrid();
                this.generator();
            }
        };
    };
});
