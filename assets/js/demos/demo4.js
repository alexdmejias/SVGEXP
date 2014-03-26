define([], function () {
    'use strict';
    return function (app) {
        return {
            shape: {
                opacity: 0.5
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
            maxShapesTotal: 5,

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
                // app.container.style.width = this.shapeWidth * this.gridLength;
                app.draw.style({
                    'width': this.shapeWidth * this.gridLength + 'px'
                });
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
                .attr({ fill: '#ddd'})
                .animate()
                .attr({ fill: '#000'})
            },

            genGrid: function () {
                var gridGroup = app.parentGroup.group().attr('clas','grid');
                var lineLength = this.gridLength * this.shapeWidth;
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

                var self = this;
                gridGroup.each(function(i) {
                    this.animate(75 * i).stroke({'dashoffset': 0});
                });

                this.placeShapesTimer = window.setTimeout(function () {
                    self.generator.call(self);
                }, (this.gridLength * 100) + 1000)

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
            }
        };
    };
});
