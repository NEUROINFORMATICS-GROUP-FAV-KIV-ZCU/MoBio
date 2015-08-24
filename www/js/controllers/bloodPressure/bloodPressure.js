angular.module('mobio.controllers')

        .controller('BloodPressureCtrl', function ($scope) {
            $scope.data = {
                d: []
            };
            $scope.data2 = {
                m: []
            };
            $scope.data3 = {};
            function pack(bytes) {
                var chars = [];
                for (var i = 0, n = bytes.length; i < n; ) {
                    chars.push(((bytes[i++] & 0xff) << 8) | (bytes[i++] & 0xff));
                }
                return String.fromCharCode.apply(null, chars);
            }

            function unpackBytes(str) {
                var bytes = [];
                for (var i = 0, n = str.length; i < n; i++) {
                    var char = str.charCodeAt(i);
                    bytes.push(/*char >>> 8, */char & 0xFF);
                }
                return bytes;
            }

            /*! http://mths.be/codepointat v0.1.0 by @mathias */
            if (!String.prototype.codePointAt) {
                (function () {
                    'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
                    var codePointAt = function (position) {
                        if (this == null) {
                            throw TypeError();
                        }
                        var string = String(this);
                        var size = string.length;
                        // `ToInteger`
                        var index = position ? Number(position) : 0;
                        if (index != index) { // better `isNaN`
                            index = 0;
                        }
                        // Account for out-of-bounds indices:
                        if (index < 0 || index >= size) {
                            return undefined;
                        }
                        // Get the first code unit
                        var first = string.charCodeAt(index);
                        var second;
                        if (// check if it’s the start of a surrogate pair
                                first >= 0xD800 && first <= 0xDBFF && // high surrogate
                                size > index + 1 // there is a next code unit
                                ) {
                            second = string.charCodeAt(index + 1);
                            if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
                                // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                                return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                            }
                        }
                        return first;
                    };
                    if (Object.defineProperty) {
                        Object.defineProperty(String.prototype, 'codePointAt', {
                            'value': codePointAt,
                            'configurable': true,
                            'writable': true
                        });
                    } else {
                        String.prototype.codePointAt = codePointAt;
                    }
                }());
            }

            function unpackBytes2(str) {
                /*var bytes = [];
                 for (var i = 0, n = str.length; i < n; i++) {
                 var char = str.charCodeAt(i);
                 bytes.push(char >>> 8, char & 0xFF);
                 }*/
                return str.split('').map(function (c) {
                    return c.codePointAt(0);
                });
            }

            function checkSum(message) {
                var sum = 0;
                for (var i = 0; i < message.length - 1; i++) {
                    sum += message[i];
                }
                return sum;
            }


            //bluetoothSerial.list(success, failure);
            var foraMAC = '8C:DE:52:21:86:94';
            var MSG_START = 43;
            var MSG_A = 37;
            var MSG_B = 38;
            var MSG_END = 80;
            var MSG_ERROR = 84;
            var startMsg = [81, MSG_START, 0, 0, 0, 0, -93, 0];
            startMsg[7] = checkSum(startMsg);
            var endMsg = [81, MSG_END, 0, 0, 0, 0, -93, 0];
            endMsg[7] = checkSum(endMsg);
            bluetoothSerial.connect(foraMAC, function (result) {
                $scope.$apply(
                        function () {
                            //$scope.data = result;
                        }
                );
                bluetoothSerial.write(startMsg,
                        function (success) {
                            $timeout(function () {
                                bluetoothSerial.read(
                                        function (result) {
                                            //askForMeasurement(0, unpackBytes(result)[2], false);
                                            askForDateTime(0, unpackBytes(result)[2], false);
                                        }
                                ,
                                        function (failure) {
                                            alert("read failure");
                                        }
                                );
                            }, 500);
                        }
                ,
                        function (failure) {
                            alert("write failure");
                        }
                );
            }, function () {
                alert("BT connectFailure");
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
                bluetoothSerial.read(
                        function (result) {
                            if (!result.length) {
                                readMeasurement(record, count, onlyLatest);
                                return false;
                            }
                            $scope.$apply(
                                    function () {
                                        $scope.data2.m.push(unpackBytes(result));
                                    }
                            );
                            if (onlyLatest) {
                                closeConnection();
                                return true;
                            }

                            if (record < count - 1) {
                                record++;
                                askForMeasurement(record, count, onlyLatest);
                            } else {
                                closeConnection();
                            }
                        }
                ,
                        function (failure) {
                            alert("read failure");
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
                bluetoothSerial.read(
                        function (result) {
                            if (!result.length) {
                                readDateTime(record, count, onlyLatest);
                                return false;
                            }
                            $scope.$apply(
                                    function () {
                                        $scope.data2.m.push(getDateTime(unpackBytes2(result)).format());
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
                            alert("read failure");
                        }
                );
            };

            byteArrayToLong = function (/*byte[]*/byteArray) {
                var value = 0;
                for (var i = byteArray.length - 1; i >= 0; i--) {
                    value = (value * 256) + byteArray[i];
                }

                return value;
            };

            var getDateTime = function (byteArr) {
                var year = 2000 + (0xFF & 0x3F & byteArr[3] >> 1); //OK
                var month = (0xFF & 0x07 & byteArr[2] >> 5) + ((0xFF & 0x01 & byteArr[3]) << 3);
                var day = 0xFF & 0x1F & byteArr[2];
                var hour = 0x1F & byteArr[5]; //OK               
                var minute = 0x3F & byteArr[4];
                $scope.data.d.push(byteArr);// += "<br>" + year + "-" + month + "-" + day + "T" + hour + ":" + minute;
                return moment().set({'year': year, 'month': month, 'day': day, 'hour': hour, 'minute': minute, 'second': 0, 'millisecond': 0});
            };
            var closeConnection = function () {

                bluetoothSerial.write(endMsg, function (success) {
                }, function (failure) {
                });
            };
        });


