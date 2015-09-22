/* global d3 */

angular.module('mobio.directives', [])
        .directive('tm8Donut', function () {
            return {
                restrict: 'E',
                require: '^donutPercentage',
                scope: {
                    donutPercentage: '=',
                    showPercentage: '=',
                    staticContentUrl: '@',
                    batteryType: '=',
                    donutWidth: '@',
                    donutTextY: '@',
                    donutClass: '@',
                    wrapperClass: '@'
                },
                templateUrl: 'templates/directives/tm8-donut.html',
                link: function (scope, iElement, iAttrs) {


                    var duration = 2000;

                    function drawDonutChart(element, percentNew, percentOld, width, height, arcWidth, textY, showPercentage) {
                        width = typeof width !== 'undefined' ? width : 252;
                        height = typeof height !== 'undefined' ? height : 252;
                        textY = typeof textY !== 'undefined' ? textY : "-.10em";


                        var dataset = {
                            lower: calcPercent(0),
                            upper: calcPercent(percentNew)
                        },
                        radius = Math.min(width, height) / 2,
                                pie = d3.layout.pie().sort(null),
                                format = d3.format(".0%");

                        var arc = d3.svg.arc()
                                .innerRadius(radius - arcWidth)
                                .outerRadius(radius);

                        //d3.select(element).selectAll('svg').remove();
                        var svg;
                        var path;
                        var text;
                        if (d3.select(element).selectAll('svg')[0].length == 0) {
                            svg = d3.select(element).append("svg")
                                    .attr("width", width)
                                    .attr("height", height)
                                    .append("g")
                                    //.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                                    .attr("style", "-webkit-transform: translate3d(" + width / 2 + "px," + height / 2 + "px, 0px)");



                            path = svg.selectAll("path")
                                    .data(pie(dataset.lower))
                                    .enter().append("path")
                                    .attr("class", function (d, i) {
                                        return "color" + i;
                                    })
                                    .attr("d", arc)
                                    .attr("style", "-webkit-transform: translateZ(0)")
                                    .each(function (d) {
                                        this._current = d;
                                    }); // store the initial values
                            text = svg.append("text")
                                    .attr("text-anchor", "middle")
                                    .attr("dy", textY);

                        } else {
                            svg = d3.select(element).selectAll('svg');
                            path = svg.selectAll("path");
                            text = svg.selectAll("text");
                        }



                        if (typeof (percentNew) === "string") {
                            text.text(percentNew);
                        }
                        else {
                            var timeout = setTimeout(function () {
                                clearTimeout(timeout);
                                path = path.data(pie(dataset.upper)); // update the data
                                path.transition().duration(duration).attrTween("d", function (a) {
                                    // Store the displayed angles in _current.
                                    // Then, interpolate from _current to the new angles.
                                    // During the transition, _current is updated in-place by d3.interpolate.
                                    var i = d3.interpolateObject(this._current, a);
                                    var i2 = d3.interpolateNumber(percentOld, percentNew);
                                    this._current = i(0);
                                    return function (t) {
                                        if (showPercentage != false) {
                                            text.text(format(i2(t) / 100).replace("%", ""));
                                        }
                                        return arc(i(t));
                                    };
                                }); // redraw the arcs
                            }, 200);
                        }
                    }
                    ;

                    function calcPercent(percent) {
                        if (percent < 100) {
                            return [percent, 100 - percent];
                        } else {
                            return [percent, 0];
                        }
                    }
                    ;



                    var wrapper = iElement[0].children[0];
                    wrapper.classList.add(scope.wrapperClass);

                    var donut = iElement[0].children[0].children[0].children[0];
                    donut.classList.add(scope.donutClass);

                    scope.$watch('donutPercentage', function (percentageNew, percentageOld) {
                        if (percentageNew == percentageOld) {
                            percentageOld = 0;

                        }

                        drawDonutChart(
                                iElement[0].children[0].children[0].children[0],
                                percentageNew,
                                percentageOld,
                                iElement[0].children[0].offsetWidth,
                                iElement[0].children[0].offsetHeight,
                                scope.donutWidth,
                                scope.donutTextY,
                                scope.showPercentage
                                );
                    });


                    if (typeof scope.staticContentUrl != 'boolean' || scope.staticContentUrl != false) {
                        var staticContent = iElement[0].children[0].children[1];
                        staticContent.className = "";
                    }

                }
            }
            ;
        })
        .directive('donutPercentage', function () {
            return {
                controller: function ($scope) {
                }
            };
        });
;