angular.module('mobio.controllers')

        .controller('StrideSDMCtrl', function ($scope, $timeout, $compile, odmlStrideSDMAnt) {


            $scope.data = {
                subscribed: false,
                discovered: [],
                selectedDevice: {},
                //
                instantaneousSpeedData: {},
                instantaneousCadenceData: {},
                cumulativeDistanceData: {},
                strideCountData: {},
                computationTimestampData: {},
                sensorStatusData: {},
                calorieData: {},
                manufacturerIdentificationData: {},
                productInformationData: {},
                manufacturerSpecificData: {},
                //
                error: {}
            };

            $scope.odMLData = odmlStrideSDMAnt.getBasicObject();

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
                                                $scope.odMLData = odmlStrideSDMAnt.addInstantaneousSpeedMeasurement($scope.odMLData, readResult);
                                                $scope.data.instantaneousSpeedData = readResult;
                                            } else if (readResult.event == "instantaneousCadenceData") {
                                                $scope.odMLData = odmlStrideSDMAnt.addInstantaneousCadenceMeasurement($scope.odMLData, readResult);
                                                $scope.data.instantaneousCadenceData = readResult;
                                            } else if (readResult.event == "cumulativeDistanceData") {
                                                $scope.odMLData = odmlStrideSDMAnt.setCumulativeDistance($scope.odMLData, readResult);
                                                $scope.data.cumulativeDistanceData = readResult;
                                            } else if (readResult.event == "strideCountData") {
                                                $scope.odMLData = odmlStrideSDMAnt.setStrideCount($scope.odMLData, readResult);
                                                $scope.data.strideCountData = readResult;
                                            } else if (readResult.event == "computationTimestampData") {
                                                $scope.odMLData = odmlStrideSDMAnt.setComputationTimestamp($scope.odMLData, readResult);
                                                $scope.data.computationTimestampData = readResult;
                                            } else if (readResult.event == "sensorStatusData") {
                                                $scope.odMLData = odmlStrideSDMAnt.setSensorStatus($scope.odMLData, readResult);
                                                $scope.data.sensorStatusData = readResult;
                                            } else if (readResult.event == "calorieData") {
                                                $scope.odMLData = odmlStrideSDMAnt.setCalorie($scope.odMLData, readResult);
                                                $scope.data.calorieData = readResult;
                                            } else if (readResult.event == "manufacturerIdentificationData") {
                                                $scope.odMLData = odmlStrideSDMAnt.setManufacturerIdentification($scope.odMLData, readResult);
                                                $scope.data.manufacturerIdentificationData = readResult;
                                            } else if (readResult.event == "productInformationData") {
                                                $scope.odMLData = odmlStrideSDMAnt.setProductInformation($scope.odMLData, readResult);
                                                $scope.data.productInformationData = readResult;
                                            } else if (readResult.event == "manufacturerSpecificData") {
                                                $scope.odMLData = odmlStrideSDMAnt.setManufacturerSpecificData($scope.odMLData, readResult);
                                                $scope.data.manufacturerSpecificData = readResult;
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

            $scope.buttonListenClick = function () {
                if ($scope.data.subscribed) {
                    $scope.unsubscribeSDM();
                } else {
                    $scope.odMLData = odmlStrideSDMAnt.getBasicObject();
                    $scope.odMLData = odmlStrideSDMAnt.setDate($scope.odMLData, moment().format());
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


