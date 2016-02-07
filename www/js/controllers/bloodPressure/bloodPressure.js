angular.module('mobio.controllers')

        .controller('BloodPressureCtrl', function ($scope, odmlBloodPressureFora) {

            $scope.lastBPM = 0;
            ///////////////// FOR TESTING ONLY /////////////////
            //return;
            ///////////////// FOR TESTING ONLY /////////////////

            $scope.data = {
                d: [],
                discovered: [],
                selectedDevice: {}
            };
            $scope.data2 = {
                m: []
            };

            var lastDateIndex = "";
            $scope.data3 = {};

            function checkSum(message) {
                var sum = 0;
                for (var i = 0; i < message.length - 1; i++) {
                    sum += message[i];
                }
                return sum;
            }

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
           
            $scope.loadData = function (onlyLatest) {

                //bluetoothSerial.list(success, failure);
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
                                            alert("read failure");
                                        }
                                );
                            }
                    ,
                            function (failure) {
                                alert("write failure");
                            }
                    );
                }, function () {
                    console.log("BT connectFailure");
                });
                var askForMeasurement = function (record, count, onlyLatest) {
                    var msgB = [81, MSG_B, 0, 0, 0, 1, -93, 0];
                    msgB[2] = (record);
                    msgB[3] = ((record >> 8));
                    msgB[7] = checkSum(msgB);
                    $scope.data3[record] = msgB;
                    bluetoothSerial.write(msgB,
                            function (success) {
                                readMeasurement(record, count, onlyLatest);
                            }
                    ,
                            function (failure) {
                                alert("write failure");
                            }
                    );
                };
                var readMeasurement = function (record, count, onlyLatest) {
                    bluetoothSerial.subscribeRawData(
                            function (result) {
                                bluetoothSerial.unsubscribeRawData();
                                $scope.$apply(
                                        function () {
                                            //$scope.data2.m.push(new Uint8Array(result));
                                            //$scope.data2.m[lastDateIndex] = new Uint8Array(result);
                                            var rawData = new Uint8Array(result);
                                            var data = odmlBloodPressureFora.getBasicObject();
                                            data = odmlBloodPressureFora.setDate(data, lastDateIndex);
                                            data = odmlBloodPressureFora.setSystolic(data, rawData[2]);
                                            data = odmlBloodPressureFora.setMean(data, rawData[3]);
                                            data = odmlBloodPressureFora.setDiastolic(data, rawData[4]);                                            
                                            data = odmlBloodPressureFora.setHeartRate(data, rawData[5]);
                                            $scope.data2.m.push(data);

                                            if (onlyLatest) {
                                                $scope.lastBPM = odmlBloodPressureFora.getHeartRate(data);
                                            }
                                        }
                                );
                                if (onlyLatest) {
                                    closeConnection();
                                    return true;
                                }

                                if (record < count - 1) {
                                    record++;
                                    //askForMeasurement(record, count, onlyLatest);
                                    askForDateTime(record, count, onlyLatest);
                                } else {
                                    closeConnection();
                                }
                            }
                    ,
                            function (failure) {
                                alert("subscribeRawData failure");
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
                    $scope.data3[record] = msgA;
                    bluetoothSerial.write(msgA,
                            function (success) {
                                readDateTime(record, count, onlyLatest);
                            }
                    ,
                            function (failure) {
                                alert("write failure");
                            }
                    );
                };
                var readDateTime = function (record, count, onlyLatest) {
                    bluetoothSerial.subscribeRawData(
                            function (result) {
                                bluetoothSerial.unsubscribeRawData();
                                lastDateIndex = getDateTime(new Uint8Array(result)).format();
                                askForMeasurement(record, count, onlyLatest);
                            }
                    ,
                            function (failure) {
                                alert("subscribeRawData failure");
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
                    }, function (failure) {
                    });
                };
            };
        });


