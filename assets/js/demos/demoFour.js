'use strict';
define(['../helpers'], function (h) {
    'use strict';
    function demo(app) {
        var colors = app.colorScheme,
            shape = {
                start: {
                    opacity: 0
                },
                end: {
                    opacity: 0.5
                }
            },
            gridLineAttrs = {
                width: 1,
                color: '#bbb'
            },

            newShapeDelay = 50, // amount of time between new shapes being generated

            globalTimer = null, // placeholder for the timer var

            shapeLength = 50, // the length of each shape

            gridLength = 10, // how many boxes per grid side

            gridCordinates = [], // placeholder for the coordinates

            gridCordinatesIds = [], // grid ids placeholder

            placeShapesTimer = null,

            currShapeCount = 0, // placeholder for the current amount of shapes

            maxShapesTotal = 400; // maximum amount of shapes(triangles) to make

        function init () {
            setupCanvas();
            genGridLines();
        }

        function reset () {
            console.log('resetting anim D');
            app.parentGroup.clear();
            currShapeCount = 0;
            gridCordinatesIds = [];
            h.stopTimer(globalTimer);
        }

        function setupCanvas () {
            var width = shapeLength * gridLength,
                height = width;
            h.setDrawWidth(width, height);
        }

        function genCoordinate () {
            var yRand = h.genRandom(gridLength - 1);
            var xRand = h.genRandom(gridLength - 1);
            var angle = h.genRandom(3) * 90;

            return [xRand, yRand, angle];

        }

        function genId (coords) {
            return coords.join('');
        }

        // draw one of the shapes using one of the grid coordinates
        function genShape (coords) {
            // var colors= ['green', 'red', 'black'];
            app.parentGroup.polygon([
                [shapeLength * coords[0], coords[1] * shapeLength],
                [shapeLength * (coords[0] + 1), coords[1] * shapeLength],
                [(coords[0] * shapeLength) + (shapeLength / 2), (coords[1] * shapeLength) + (shapeLength / 2)]
            ])
            .rotate(coords[2], (coords[0] * shapeLength) + (shapeLength / 2), (coords[1] * shapeLength) + (shapeLength / 2))
            // .attr(shape.start)
            .style({
                fill: colors[h.genRandom(4)],
                opacity: 0
            })
            .attr('class', coords.join(''))
            .animate()
            // .attr(shape.end);
            .style({
                opacity: 1
            });

        }

        // draw the grid lines
        function genGridLines () {
            // group that wiil house grid lines
            var gridGroup = app.parentGroup.group().attr('clas', 'grid'),
            // cache of total line length
                lineLength = gridLength * shapeLength,
            // how much time has to pass after the grid finished for the shapes to appear
                timeAfterGrid = (gridLength * 100) + 500,
                self =

            gridLineAttrs.dasharray = lineLength;
            gridLineAttrs.dashoffset = lineLength;

            for (var i = 0; i < gridLength + 1; i++) {
                // horizontal lines
                gridGroup.polyline([[0, shapeLength * i], [lineLength, shapeLength * i ]])
                .stroke(gridLineAttrs);
                // vertical lines
                gridGroup.polyline([[shapeLength * i, 0], [shapeLength * i, lineLength ]])
                .stroke(gridLineAttrs);
            }

            // animate each line
            gridGroup.each(function (i) {
                this.animate(75 * i).stroke({'dashoffset': 0});
            });

            // call on the shapes generator to after the grid finished
            placeShapesTimer = window.setTimeout(function () {
                // self.generator.call(self);
                generator();

            }, timeAfterGrid);

        }

        function loop () {
            var coords = genCoordinate();
            var id = genId(coords);

            if (gridCordinatesIds.indexOf(id) === -1) {
                genShape(coords);
                gridCordinatesIds.push(id);
                currShapeCount++;
                generator();
            } else {
                loop();
            }
        }

        function generator () {
            if ((currShapeCount) < maxShapesTotal) {
                globalTimer = window.setTimeout(function () {
                    loop();
                }, newShapeDelay);
            }
        }

        return {
            init: init,
            reset: reset
        }
    }

    return demo;
});
