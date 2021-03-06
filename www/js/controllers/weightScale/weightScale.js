angular.module('mobio.controllers')

        .controller('WeightScaleCtrl', function ($scope, $ionicPopup, odmlWGTAnt, profileCache, experimentCache, experimentService) {


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
                error: {},
                bmi: {
                    value: null,
                    text: ""
                }
            };
            
            var calculateBmi = function (weight, height) {               
                if (weight > 0 && height > 0) {
                    var finalBmi = weight / (height / 100 * height / 100)
                    $scope.data.bmi.value = finalBmi;
                    if (finalBmi < 18.5) {
                        $scope.data.bmi.text = "you are too thin.";
                    }
                    if (finalBmi > 18.5 && finalBmi < 25) {
                        $scope.data.bmi.text = "you are healthy.";
                    }
                    if (finalBmi > 25) {
                        $scope.data.bmi.text = "you have overweight.";
                    }
                }
                else {
                    $scope.data.bmi.text = "the input values are not correct.";
                }
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
                                                if(readResult.bodyWeightStatus == "VALID") {
                                                    calculateBmi(readResult.bodyWeight, profileCache.getSelectedProfile().height);
                                                }
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
                var userProfile = profileCache.getSelectedProfile();
                $scope.odMLData = odmlWGTAnt.setUserProfile($scope.odMLData, userProfile);
                try {
                    antplus.requestAdvancedWGT(userProfile);
                } catch (e) {
                    console.log("antplus is not defined");
                }
            };

            $scope.buttonListenClick = function () {
                if ($scope.data.subscribed) {
                    $scope.unsubscribeWGT();
                } else {
                    $scope.odMLData = odmlWGTAnt.getBasicObject();
                    $scope.odMLData = odmlWGTAnt.setDate($scope.odMLData, moment().format("YYYY-MM-DDTHH:mm:ss.SSSZZ"));
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

            $scope.uploadMeasurement = function () {
                $scope.showUploadSpinner = true;
                var experiment = experimentCache.getSelectedExperiment();
                experimentService.uploadOdml($scope.odMLData, experiment.experimentId).then(
                        function (response) {
                            $scope.showUploadSpinner = false;
                            $ionicPopup.show({
                                template: '',
                                title: 'Successfully Uploaded',
                                scope: $scope,
                                buttons: [
                                    {
                                        text: 'OK',
                                        type: 'button-positive'
                                    }
                                ]
                            });
                        },
                        function (error) {
                            $scope.showUploadSpinner = false;
                            $ionicPopup.show({
                                template: '',
                                title: 'Upload failed. Try again.',
                                scope: $scope,
                                buttons: [
                                    {
                                        text: 'OK',
                                        type: 'button-positive'
                                    }
                                ]
                            });
                        });
            };            

        });


