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
            grid: {
                width: 1,
                color: '#bbb'
            },
            newShapeDelay: 250,
            shapeWidth: 50,
            gridLength: 10,
            maxShapes: 3,
            newShapeTimer: null,
            placeShapesTimer: null,
            currShapeCount: 0,
            maxShapesTotal: 30,

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
                    'width': this.shapeWidth * this.gridLength + 'px'
                });
            },

            genRandInRange: function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            genShape: function () {
                var xPos = Math.floor(Math.random() * this.gridLength),
                    yPos = Math.floor(Math.random() * this.gridLength),
                    translatePos = Math.floor(Math.random() * 4) * 90;

                app.parentGroup.polygon([
                    [this.shapeWidth * xPos, yPos * this.shapeWidth],
                    [this.shapeWidth*(xPos+1), yPos*this.shapeWidth],
                    [(xPos*this.shapeWidth)+(this.shapeWidth/2),(yPos*this.shapeWidth)+(this.shapeWidth/2)]
                ])
                .rotate(translatePos, (xPos*this.shapeWidth)+(this.shapeWidth/2),(yPos*this.shapeWidth)+(this.shapeWidth/2))
                .attr(this.shape.start)
                .animate()
                .attr(this.shape.end);
            },

            genGridLines: function () {
                // group that wiil house grid lines
                var gridGroup = app.parentGroup.group().attr('clas','grid'),
                // cache of total line length
                    lineLength = this.gridLength * this.shapeWidth,
                // how much time has to pass after the grid finished for the shapes to appear
                    timeAfterGrid = (this.gridLength * 100) + 500,
                    self = this;

                this.grid.dasharray = lineLength;
                this.grid.dashoffset = lineLength;

                for (var i = 0; i < this.gridLength + 1; i++) {
                    // horizontal lines
                    gridGroup.polyline([[0, this.shapeWidth * i],[lineLength, this.shapeWidth * i ]])
                    .stroke(this.grid);
                    // vertical lines
                    gridGroup.polyline([[this.shapeWidth * i, 0],[this.shapeWidth * i, lineLength ]])
                    .stroke(this.grid);
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
                this.genGridLines();
            }
        };
    };
});
