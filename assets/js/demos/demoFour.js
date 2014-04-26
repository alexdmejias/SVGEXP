define(['../helpers'], function (Helpers) {
    'use strict';
    function demo(app) {
        var colors = app.colorScheme,
            shape = {
                start: {
                    opacity: 0
                },
                end: {
                    opacity: 0.75
                },
                fadeDuration: 50
            },
            gridLineAttrs = {
                width: 1,
                color: '#bbb'
            },
            initiated = false,
            newShapeDelay = 5, // amount of time between new shapes being generated
            newShapeTimer = null, // placeholder for the timer var
            shapeLength = 50, // the length of each shape
            gridLength = 5, // how many boxes per grid side
            timeAfterGrid = null, // how much time has to pass after the grid finished for the shapes to appear
            remainingCoordinates = [], // placeholder for the coordinates
            currShapeCount = 0, // placeholder for the current amount of shapes
            maxShapesTotal = 50, // maximum amount of shapes(triangles) to make
            trianglesGroup = null,
            gridLinesGroup = null; // group that will house grid lines


        /**
         * kicks things off
         * @return {none}
         */
        function init() {
            if(!initiated) {
                setupCanvas();
                trianglesGroup = app.parentGroup.group();
                gridLinesGroup = app.parentGroup.group().attr('class', 'grid');
                timeAfterGrid = (gridLength * 50) + 500;
                genGridLines();

                initiated = true;
            }

            remainingCoordinates = genCoordinates(gridLength, gridLength, 4);
            // call on the shapes generator to after the grid finished
            newShapeTimer = window.setTimeout(function () {
                animationStart();
            }, timeAfterGrid);

            timeAfterGrid = 0;

        }

        function reset(type) {
            trianglesGroup.clear();
            currShapeCount = 0;
            remainingCoordinates = [];
            Helpers.stopTimer(newShapeTimer);

            if (type && type === 'hard') {
                gridLinesGroup.clear();
                initiated = false;
            }
        }

        function setupCanvas() {
            var width = shapeLength * gridLength,
                height = width;
            Helpers.setDrawWidth(width, height);
        }

        function genCoordinates(x, y, z) {
            var grid = [];
            for (var i = 0; i < x; i++) {
                for (var h = 0; h < x; h++) {
                    for (var j = 0; j < z; j++) {
                        grid.push([i, h, j]);
                    }
                }
            }

            return grid;
        }

        // draw one of the shapes using one of the grid coordinates
        function genShape(coords) {

            trianglesGroup.polygon([
                [shapeLength * coords[0], coords[1] * shapeLength],
                [shapeLength * (coords[0] + 1), coords[1] * shapeLength],
                [(coords[0] * shapeLength) + (shapeLength / 2), (coords[1] * shapeLength) + (shapeLength / 2)]
            ])
            .rotate(coords[2] * 90, (coords[0] * shapeLength) + (shapeLength / 2), (coords[1] * shapeLength) + (shapeLength / 2))
            .style({
                fill: colors[Helpers.genRandom(4)],
                opacity: shape.start.opacity
            })
            .attr('class', coords.join(''))
            .animate(shape.fadeDuration)
            .style({
                opacity: shape.end.opacity
            });
        }

        // draw the grid lines
        function genGridLines() {
                // cache of total line length
            var lineLength = gridLength * shapeLength;

            gridLineAttrs.dasharray = lineLength;
            gridLineAttrs.dashoffset = lineLength;

            for (var i = 0; i < gridLength + 1; i++) {
                // horizontal lines
                gridLinesGroup.polyline([[0, shapeLength * i], [lineLength, shapeLength * i ]])
                    .stroke(gridLineAttrs);
                // vertical lines
                gridLinesGroup.polyline([[shapeLength * i, 0], [shapeLength * i, lineLength ]])
                    .stroke(gridLineAttrs);

            }

            // animate each line
            gridLinesGroup.each(function (i) {
                this.animate(75 * i).stroke({'dashoffset': 0});
            });
        }

        function loop() {
            // clear the previous timer, should help with performance
            Helpers.stopTimer(newShapeTimer);

            var r = Helpers.genRandom(remainingCoordinates.length - 1);
            genShape(remainingCoordinates[r]);

            newShapeTimer = setTimeout(function () {
                animationStart();
            }, newShapeDelay);

            remainingCoordinates.splice(r, 1);
            currShapeCount++;
        }

        function animationStart() {
            if (currShapeCount < maxShapesTotal) {
                loop();
            } else {
                // stop animation if there are no more coordinates left
                Helpers.stopTimer(newShapeTimer);
            }
        }

        return {
            init: init,
            reset: reset
        };
    }

    return demo;
});
