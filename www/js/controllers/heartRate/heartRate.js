angular.module('mobio.controllers')

        .controller('HeartRateCtrl', function ($scope) {


            $scope.data = {
                subscribed: false,
                discovered: [],
                heartRateData: {},
                page4AddtData: {},
                cumulativeOperatingTime: {},
                manufacturerAndSerial: {},
                versionAndModelEvent: {},
                calculatedRrIntervalEvent: {},
                deviceStateChange: {}
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
                                            } else if (readResult.event == "deviceStateChange") {
                                                $scope.data.deviceStateChange = readResult;
                                            }

                                        });
                            }
                    ,
                            function (error) {
                                console.log(error);
                            });
                } catch (e) {
                    console.log("antplus is not defined");
                }
            };


            $scope.buttonClick = function () {
                if ($scope.data.subscribed) {
                    $scope.unsubscribeHR();
                } else {
                    $scope.subscribeHR($scope.data.discovered[0].antDeviceNumber);
                }
                $scope.data.subscribed = !$scope.data.subscribed;
            };

            $scope.buttonStopSearchClick = function () {
                antplus.stopSearchDevices(function (result) {
                    console.log(result);
                }, function (error) {
                    console.log(error);
                });
            };


            try {
                antplus.searchDevices(
                        function (result) {
                            $scope.$apply(
                                    function () {
                                        $scope.data.discovered.push(result);
                                    }
                            );
                        }
                ,
                        function (error) {
                            console.log(error);
                        });
            } catch (e) {
                console.log("antplus is not defined");
            }


        });


