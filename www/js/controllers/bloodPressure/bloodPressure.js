angular.module('mobio.controllers')

        .controller('BloodPressureCtrl', function ($scope, $ionicPopup, odmlBloodPressureFora, experimentCache, experimentService) {

            ///////////////// FOR TESTING ONLY /////////////////
            //return;
            ///////////////// FOR TESTING ONLY /////////////////

            $scope.data = {
                discovered: [],
                selectedDevice: {},
                lastBPM: 0,
                subscribed: false,
                hyperZone: null
            };
                                    
            var calculateHypertensionZone = function(systolic, diastolic) {
                if(systolic < 140 && diastolic < 90) {
                    $scope.data.hyperZone = 1;
                } else if(systolic >= 140 && systolic <= 179 && diastolic >= 90 && diastolic <= 104) {
                    $scope.data.hyperZone = 2;
                } else if(systolic >= 180 && systolic <= 199 && diastolic >= 105 && diastolic <= 114) {
                    $scope.data.hyperZone = 3;
                } else if(systolic >= 200 && diastolic >= 115) {
                    $scope.data.hyperZone = 4;
                }
            };

            $scope.odMLData = odmlBloodPressureFora.getBasicObject();

            var lastDateIndex = "";

            function checkSum(message) {
                var sum = 0;
                for (var i = 0; i < message.length - 1; i++) {
                    sum += message[i];
                }
                return sum;
            }

            function setSubscribedFlag(subscribed) {
                $scope.$apply(
                        function () {
                            $scope.data.subscribed = subscribed;
                        }
                );
            }
            ;

            bluetoothSerial.isEnabled(
                    function () {
                        bluetoothSerial.list(function (result) {
                            $scope.$apply(
                                    function () {
                                        $scope.data.discovered = result;
                                    }
                            );
                        }, function (failure) {
                        });
                    },
                    function () {
                        bluetoothSerial.enable(function () {
                            bluetoothSerial.list(function (result) {
                                $scope.$apply(
                                        function () {
                                            $scope.data.discovered = result;
                                        }
                                );
                            }, function (failure) {
                            });
                        }, function () {
                        });
                    }
            );

            $scope.resetData = function () {
                $scope.odMLData = odmlBloodPressureFora.getBasicObject();
                $scope.data.lastBPM = 0;
            };

            $scope.loadData = function (onlyLatest) {
                $scope.data.subscribed = true;
                if (onlyLatest) {
                    $scope.odMLData = odmlBloodPressureFora.resetBloodPressureLatest($scope.odMLData);
                    $scope.data.lastBPM = 0;
                } else {
                    $scope.odMLData = odmlBloodPressureFora.resetBloodPressureMeasurement($scope.odMLData);
                }
                $scope.odMLData = odmlBloodPressureFora.setDate($scope.odMLData, moment().format("YYYY-MM-DDTHH:mm:ss.SSSZZ"));
                $scope.odMLData = odmlBloodPressureFora.setDeviceInfo($scope.odMLData, $scope.data.selectedDevice);
                var id = $scope.data.selectedDevice.id; //'8C:DE:52:21:86:94';
                var MSG_START = 43;
                var MSG_A = 37;
                var MSG_B = 38;
                var MSG_END = 80;
                var MSG_ERROR = 84;
                var startMsg = [81, MSG_START, 0, 0, 0, 0, -93, 0];
                startMsg[7] = checkSum(startMsg);
                var endMsg = [81, MSG_END, 0, 0, 0, 0, -93, 0];
                endMsg[7] = checkSum(endMsg);
                if (typeof id == 'undefined') {
                    $scope.data.subscribed = false;
                    alert('Device not selected.');
                    return false;
                }

                bluetoothSerial.connect(id, function (result) {
                    bluetoothSerial.write(startMsg,
                            function (success) {
                                bluetoothSerial.subscribeRawData(
                                        function (result) {
                                            bluetoothSerial.unsubscribeRawData();
                                            var data = new Uint8Array(result);
                                            askForDateTime(0, data[2], onlyLatest);
                                        }
                                ,
                                        function (failure) {
                                            setSubscribedFlag(false);
                                            console.log("BT read failure");
                                        }
                                );
                            }
                    ,
                            function (failure) {
                                setSubscribedFlag(false);
                                console.log("BT write failure");
                            }
                    );
                }, function () {
                    setSubscribedFlag(false);
                    console.log("BT connect ended");
                });
                var askForMeasurement = function (record, count, onlyLatest) {
                    var msgB = [81, MSG_B, 0, 0, 0, 1, -93, 0];
                    msgB[2] = (record);
                    msgB[3] = ((record >> 8));
                    msgB[7] = checkSum(msgB);
                    bluetoothSerial.write(msgB,
                            function (success) {
                                readMeasurement(record, count, onlyLatest);
                            }
                    ,
                            function (failure) {
                                setSubscribedFlag(false);
                                console.log("BT write failure");
                            }
                    );
                };
                var readMeasurement = function (record, count, onlyLatest) {
                    bluetoothSerial.subscribeRawData(
                            function (result) {
                                bluetoothSerial.unsubscribeRawData();
                                $scope.$apply(
                                        function () {
                                            var rawData = new Uint8Array(result);
                                            var dataToSet = {
                                                systolic: rawData[2],
                                                diastolic: rawData[4],
                                                mean: rawData[3],
                                                heartRate: rawData[5]
                                            };

                                            if (onlyLatest) {
                                                $scope.odMLData = odmlBloodPressureFora.setBloodPressureLatest($scope.odMLData, lastDateIndex, dataToSet);
                                                $scope.data.lastBPM = odmlBloodPressureFora.getLatestHeartRate($scope.odMLData);
                                                calculateHypertensionZone(dataToSet.systolic, dataToSet.diastolic);
                                            } else {
                                                $scope.odMLData = odmlBloodPressureFora.addBloodPressureMeasurement($scope.odMLData, lastDateIndex, dataToSet);
                                            }
                                        }
                                );
                                if (onlyLatest) {
                                    closeConnection();
                                    return true;
                                }

                                if (record < count - 1) {
                                    record++;
                                    askForDateTime(record, count, onlyLatest);
                                } else {
                                    closeConnection();
                                }
                            }
                    ,
                            function (failure) {
                                setSubscribedFlag(false);
                                console.log("BT subscribeRawData failure");
                            }
                    );
                };
                ////////////////////////////////////////////////////////////////////
                var askForDateTime = function (record, count, onlyLatest) {
                    var msgA = [81, MSG_A, 0, 0, 0, 1, -93, 0];
                    msgA[2] = (record);
                    msgA[3] = ((record >> 8));

                    if (record > 0) {
                        msgA[5] = 0;
                    }

                    msgA[7] = checkSum(msgA);
                    bluetoothSerial.write(msgA,
                            function (success) {
                                readDateTime(record, count, onlyLatest);
                            }
                    ,
                            function (failure) {
                                setSubscribedFlag(false);
                                console.log("BT write failure");
                            }
                    );
                };
                var readDateTime = function (record, count, onlyLatest) {
                    bluetoothSerial.subscribeRawData(
                            function (result) {
                                bluetoothSerial.unsubscribeRawData();
                                lastDateIndex = getDateTime(new Uint8Array(result)).format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
                                askForMeasurement(record, count, onlyLatest);
                            }
                    ,
                            function (failure) {
                                setSubscribedFlag(false);
                                console.log("BT subscribeRawData failure");
                            }
                    );
                };

                var getDateTime = function (byteArr) {
                    var year = 2000 + (0xFF & 0x3F & byteArr[3] >> 1); //OK
                    var month = (0xFF & 0x07 & byteArr[2] >> 5) + ((0xFF & 0x01 & byteArr[3]) << 3);
                    var day = 0xFF & 0x1F & byteArr[2];
                    var hour = 0x1F & byteArr[5]; //OK               
                    var minute = 0x3F & byteArr[4];
                    return moment().set({'year': year, 'month': month - 1, 'date': day, 'hour': hour, 'minute': minute, 'second': 0, 'millisecond': 0});
                };

                var closeConnection = function () {
                    bluetoothSerial.write(endMsg, function (success) {
                        setSubscribedFlag(false);
                    }, function (failure) {
                        setSubscribedFlag(false);
                        console.log("BT closeConnection failure");
                    });
                };
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


