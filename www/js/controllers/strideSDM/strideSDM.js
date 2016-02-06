angular.module('mobio.controllers')

        .controller('StrideSDMCtrl', function ($scope, $timeout, $compile) {


            $scope.data = {
                subscribed: false,
                discovered: [],
                selectedDevice: {},
                instantaneousSpeedData: {},
                instantaneousCadenceData: {},
                cumulativeDistanceData: {},
                strideCountData: {},
                computationTimestampData: {},
                latencyData: {},
                sensorStatusData: {},
                calorieData: {},
                manufacturerIdentificationData: {},
                productInformationData: {},
                manufacturerSpecificData: {},
                error: {}
            };


            $scope.spinner = {
                show: false
            };

            $scope.unsubscribeSDM = function () {
                try {
                    antplus.unsubscribeSDM();
                } catch (e) {
                    console.log("antplus is not defined");
                }
            };

            $scope.subscribeSDM = function (antDeviceNumber) {
                try {
                    antplus.subscribeSDM(antDeviceNumber,
                            function (readResult) {
                                $scope.$apply(
                                        function () {
                                            if (readResult.event == "instantaneousSpeedData") {
                                                $scope.data.instantaneousSpeedData = readResult;
                                            } else if (readResult.event == "instantaneousCadenceData") {
                                                $scope.data.instantaneousCadenceData = readResult;
                                            } else if (readResult.event == "cumulativeDistanceData") {
                                                $scope.data.cumulativeDistanceData = readResult;
                                            } else if (readResult.event == "strideCountData") {
                                                $scope.data.strideCountData = readResult;
                                            } else if (readResult.event == "computationTimestampData") {
                                                $scope.data.computationTimestampData = readResult;
                                            } else if (readResult.event == "latencyData") {
                                                $scope.data.latencyData = readResult;
                                            } else if (readResult.event == "sensorStatusData") {
                                                $scope.data.sensorStatusData = readResult;
                                            } else if (readResult.event == "calorieData") {
                                                $scope.data.calorieData = readResult;
                                            } else if (readResult.event == "manufacturerIdentificationData") {
                                                $scope.data.manufacturerIdentificationData = readResult;
                                            } else if (readResult.event == "productInformationData") {
                                                $scope.data.productInformationData = readResult;
                                            } else if (readResult.event == "manufacturerSpecificData") {
                                                $scope.data.manufacturerSpecificData = readResult;
                                            }
                                        });
                            }
                    ,
                            function (error) {
                                console.log(JSON.stringify(error));
                                $scope.$apply(
                                        function () {
                                            $scope.data.error = JSON.stringify(error);
                                        });
                            });
                } catch (e) {
                    console.log("antplus is not defined");
                }
            };

            $scope.buttonListenClick = function () {
                if ($scope.data.subscribed) {
                    $scope.unsubscribeSDM();
                } else {
                    $scope.subscribeSDM($scope.data.selectedDevice.antDeviceNumber);
                }
                $scope.data.subscribed = !$scope.data.subscribed;
            };

            $scope.buttonStopSearchClick = function () {
                $scope.spinner.show = false;
                antplus.stopSearchDevices(function (result) {
                    console.log(result);
                }, function (error) {
                    console.log(JSON.stringify(error));
                });
            };

            $scope.buttonStartSearchClick = function () {
                $scope.data.discovered = [];
                $scope.spinner.show = true;
                try {
                    antplus.searchDevices(
                            "STRIDE_SDM",
                            function (result) {
                                $scope.$apply(
                                        function () {
                                            $scope.data.discovered.push(result);
                                        }
                                );
                            }
                    ,
                            function (error) {
                                console.log(JSON.stringify(error));
                            });
                } catch (e) {
                    console.log("antplus is not defined");
                }
            };

        });


