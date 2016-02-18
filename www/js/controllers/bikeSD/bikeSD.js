angular.module('mobio.controllers')

        .controller('BikeSDCtrl', function ($scope, $timeout, $compile, $ionicPopup, odmlBikeAnt) {


            $scope.data = {
                subscribed: false,
                discovered: [],
                selectedDevice: {},
                wheelCircumference: 2070,
                error: {}
            };

            $scope.odMLData = odmlBikeAnt.getBasicObject();

            $scope.spinner = {
                show: false
            };

            $scope.unsubscribeBike = function () {
                try {
                    antplus.unsubscribeBike();
                } catch (e) {
                    console.log("antplus is not defined");
                }
            };

            $scope.subscribeBike = function (antDeviceNumber, circumference, deviceType) {
                try {
                    antplus.subscribeBike(antDeviceNumber, circumference, deviceType,
                            function (readResult) {
                                $scope.$apply(
                                        function () {
                                            if (readResult.event == "calculatedSpeedData") {
                                                $scope.odMLData = odmlBikeAnt.addCalculatedSpeed($scope.odMLData, readResult);
                                            } else if (readResult.event == "calculatedAccumulatedDistanceData") {
                                                $scope.odMLData = odmlBikeAnt.setCalculatedAccumulatedDistance($scope.odMLData, readResult);
                                            } else if (readResult.event == "cumulativeRevolutionsData") {
                                                $scope.odMLData = odmlBikeAnt.setCumulativeRevolutions($scope.odMLData, readResult);
                                            } else if (readResult.event == "calculatedCadenceData") {
                                                $scope.odMLData = odmlBikeAnt.setCalculatedCadence($scope.odMLData, readResult);
                                            } else if (readResult.event == "cumulativeOperatingTimeData") {
                                                $scope.odMLData = odmlBikeAnt.setCumulativeOperatingTime($scope.odMLData, readResult);
                                            } else if (readResult.event == "manufacturerAndSerialData") {
                                                $scope.odMLData = odmlBikeAnt.setManufacturerAndSerial($scope.odMLData, readResult);
                                            } else if (readResult.event == "versionAndModelData") {
                                                $scope.odMLData = odmlBikeAnt.setVersionAndModel($scope.odMLData, readResult);
                                            } else if (readResult.event == "batteryStatusData") {
                                                $scope.odMLData = odmlBikeAnt.setBatteryStatus($scope.odMLData, readResult);
                                            } else if (readResult.event == "motionAndSpeedData") {
                                                $scope.odMLData = odmlBikeAnt.setMotionAndSpeed($scope.odMLData, readResult);
                                            } else if (readResult.event == "deviceStateChange") {
                                                $scope.data.deviceStateChange = readResult;
                                            }
                                            $scope.data.error = JSON.stringify(readResult);
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
                    $scope.data.subscribed = !$scope.data.subscribed;
                    $scope.unsubscribeBike();
                } else {
                    $scope.odMLData = odmlBikeAnt.getBasicObject();
                    var deviceType = "BIKE_SPD";
                    if ($scope.data.selectedDevice.antDeviceType == "Bike Speed and Cadence Sensors") {
                        deviceType = "BIKE_SPDCAD";
                    } else if ($scope.data.selectedDevice.antDeviceType == "Bike Speed Sensors") {
                        deviceType = "BIKE_SPD";
                    } else if ($scope.data.selectedDevice.antDeviceType == "Bike Cadence Sensors") {
                        deviceType = "BIKE_CADENCE";
                    }

                    $ionicPopup.show({
                        template: '<input type="text" ng-model="data.wheelCircumference">',
                        title: 'Enter Wheel Circumference',
                        subTitle: '(mm)',
                        scope: $scope,
                        buttons: [
                            {text: 'Cancel'},
                            {
                                text: '<b>Save</b>',
                                type: 'button-positive',
                                onTap: function (e) {
                                    if (!$scope.data.wheelCircumference) {
                                        //don't allow the user to close unless he enters Wheel Circumference
                                        e.preventDefault();
                                    } else {
                                        $scope.odMLData = odmlBikeAnt.setDate($scope.odMLData, moment().format());
                                        $scope.odMLData = odmlBikeAnt.setWheelCircumference($scope.odMLData, $scope.data.wheelCircumference);
                                        $scope.subscribeBike($scope.data.selectedDevice.antDeviceNumber,
                                                odmlBikeAnt.getWheelCircumference($scope.odMLData).property[0].value.content,
                                                deviceType);
                                                
                                        $scope.data.subscribed = !$scope.data.subscribed;
                                    }
                                }
                            }
                        ]
                    });


                }

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
                            "BIKE_SPD,BIKE_CADENCE,BIKE_SPDCAD",
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


