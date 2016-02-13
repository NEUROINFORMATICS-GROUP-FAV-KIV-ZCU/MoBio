angular.module('mobio.controllers')

        .controller('WeightScaleCtrl', function ($scope, $timeout, $compile, odmlWGTAnt) {


            $scope.data = {
                subscribed: false,
                discovered: [],
                selectedDevice: {},
                //
                basicMeasurementData: {},
                advancedMeasurementData: {},
                manufacturerIdentificationData: {},
                productInformationData: {},
                bodyWeightBroadcastData: {},
                //
                error: {}
            };

            $scope.odMLData = odmlWGTAnt.getBasicObject();

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
                                                $scope.odMLData = odmlWGTAnt.setManufacturerIdentification($scope.odMLData, readResult);
                                                $scope.data.manufacturerIdentificationData = readResult;
                                            } else if (readResult.event == "productInformationData") {
                                                $scope.odMLData = odmlWGTAnt.setProductInformation($scope.odMLData, readResult);
                                                $scope.data.productInformationData = readResult;
                                            } else if (readResult.event == "bodyWeightBroadcastData") {
                                                $scope.odMLData = odmlWGTAnt.setBodyWeightBroadcast($scope.odMLData, readResult);
                                                $scope.data.bodyWeightBroadcastData = readResult;
                                            } else if (readResult.event == "basicMeasurementData") {
                                                $scope.odMLData = odmlWGTAnt.setBasicMeasurement($scope.odMLData, readResult);
                                                $scope.data.basicMeasurementData = readResult;
                                            } else if (readResult.event == "advancedMeasurementData") {
                                                $scope.odMLData = odmlWGTAnt.setAdvancedMeasurement($scope.odMLData, readResult);
                                                $scope.data.advancedMeasurementData = readResult;
                                            } else if (readResult.event == "deviceStateChange") {
                                                $scope.data.deviceStateChange = readResult;
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
                $scope.odMLData = odmlWGTAnt.setUserProfile($scope.odMLData, userProfileTest);
                try {
                    antplus.requestAdvancedWGT(userProfileTest);
                } catch (e) {
                    console.log("antplus is not defined");
                }
            };

            $scope.buttonListenClick = function () {
                if ($scope.data.subscribed) {
                    $scope.unsubscribeWGT();
                } else {
                    $scope.odMLData = odmlWGTAnt.getBasicObject();
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


