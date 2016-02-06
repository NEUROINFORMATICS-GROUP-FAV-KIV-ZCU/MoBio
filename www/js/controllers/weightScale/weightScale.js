angular.module('mobio.controllers')

        .controller('WeightScaleCtrl', function ($scope, $timeout, $compile) {


            $scope.data = {
                subscribed: false,
                discovered: [],
                selectedDevice: {},
                basicMeasurementData: {},
                advancedMeasurementData: {},
                manufacturerIdentificationData: {},
                productInformationData: {},
                bodyWeightBroadcastData: {},
                error: {}
            };


            $scope.spinner = {
                show: false
            };

            $scope.unsubscribeWGT = function () {
                try {
                    antplus.unsubscribeWGT();
                } catch (e) {
                    console.log("antplus is not defined");
                }
            };

            $scope.subscribeWGT = function (antDeviceNumber) {
                try {
                    antplus.subscribeWGT(antDeviceNumber,
                            function (readResult) {
                                $scope.$apply(
                                        function () {
                                            if (readResult.event == "manufacturerIdentificationData") {
                                                $scope.data.manufacturerIdentificationData = readResult;
                                            } else if (readResult.event == "productInformationData") {
                                                $scope.data.productInformationData = readResult;
                                            } else if (readResult.event == "bodyWeightBroadcastData") {
                                                $scope.data.bodyWeightBroadcastData = readResult;
                                            } else if (readResult.event == "deviceStateChange") {
                                                $scope.data.deviceStateChange = readResult;
                                            } else if (readResult.event == "basicMeasurementData") {
                                                $scope.data.basicMeasurementData = readResult;
                                            } else if (readResult.event == "advancedMeasurementData") {
                                                $scope.data.advancedMeasurementData = readResult;
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

            $scope.requestBasicWGT = function () {
                try {
                    antplus.requestBasicWGT();
                } catch (e) {
                    console.log("antplus is not defined");
                }
            };

            $scope.requestAdvancedWGT = function () {
                var userProfileTest = {
                    age: 26,
                    height: 185,
                    gender: 1,
                    lifetimeAthlete: false,
                    activityLevel: 4
                };

                try {
                    antplus.requestAdvancedWGT(userProfileTest);
                } catch (e) {
                    console.log("antplus is not defined");
                }
            };

            $scope.buttonListenClick = function () {
                $scope.data.heartRateData = [];
                $scope.data.chartData = [{x: 0, y: 50}];
                if ($scope.data.subscribed) {
                    $scope.unsubscribeWGT();
                } else {
                    $scope.subscribeWGT($scope.data.selectedDevice.antDeviceNumber);
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
                            "WEIGHT_SCALE",
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


