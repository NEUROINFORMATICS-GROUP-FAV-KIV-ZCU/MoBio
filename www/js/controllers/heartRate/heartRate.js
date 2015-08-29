angular.module('mobio.controllers')

        .controller('HeartRateCtrl', function ($scope) {


            $scope.data = {
                subscribed: false,
                discovered: null,
                heartRateData: {},
                page4AddtData: {},
                cumulativeOperatingTime: {},
                manufacturerAndSerial: {},
                versionAndModelEvent: {},
                calculatedRrIntervalEvent: {}
            };

            $scope.unsubscribeHR = function () {
                try {
                    antplus.unsubscribeHR();
                } catch (e) {
                    console.log("antplus is not defined");
                }
            };

            $scope.subscribeHR = function (antDeviceNumber) {
                try {
                    antplus.subscribeHR(antDeviceNumber,
                            function (readResult) {
                                $scope.$apply(
                                        function () {
                                            if (readResult.event == "heartRateData") {
                                                $scope.data.heartRateData = readResult;
                                            } else if (readResult.event == "page4AddtData") {
                                                $scope.data.page4AddtData = readResult;
                                            } else if (readResult.event == "cumulativeOperatingTime") {
                                                $scope.data.cumulativeOperatingTime = readResult;
                                            } else if (readResult.event == "manufacturerAndSerial") {
                                                $scope.data.manufacturerAndSerial = readResult;
                                            } else if (readResult.event == "versionAndModelEvent") {
                                                $scope.data.versionAndModelEvent = readResult;
                                            } else if (readResult.event == "calculatedRrIntervalEvent") {
                                                $scope.data.calculatedRrIntervalEvent = readResult;
                                            }

                                        });
                            }
                    ,
                            function () {
                                alert("Error read");
                            });
                } catch (e) {
                    console.log("antplus is not defined");
                }
            };


            $scope.buttonClick = function () {
                if ($scope.data.subscribed) {
                    $scope.unsubscribeHR();
                } else {
                    $scope.subscribeHR($scope.data.discovered.antDeviceNumber);
                }
                $scope.data.subscribed = !$scope.data.subscribed;
            };


            try {
                antplus.discover(
                        function (result) {
                            $scope.$apply(
                                    function () {
                                        $scope.data.discovered = result;
                                    }
                            );
                        }
                ,
                        function () {
                            alert("Error discover");
                        });
            } catch (e) {
                console.log("antplus is not defined");
            }


        });


