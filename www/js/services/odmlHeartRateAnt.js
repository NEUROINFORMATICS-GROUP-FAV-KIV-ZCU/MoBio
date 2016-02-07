angular.module('mobio.odML')

        .factory('odmlHeartRateAnt', function ($http, $q) {

            var odMLdataStructure = {
                "odML": {
                    "author": "mobio_app",
                    "date": "1970-01-01T00:00:00+00:00", //ISO 8601
                    "version": 1,
                    "xmlns:gui": "http://www.g-node.org/guiml",
                    "section": [
                        {//0
                            "name": "Heart Rate Measurement",
                            "type": "heartRateMeasurement",
                            "section": [
                                // push this object
//                                {
//                                    "name": "hr",
//                                    "type": "hr",
//                                    "property": [
//                                        {
//                                            "name": "timestamp",
//                                            "value": {
//                                                "type": "int",
//                                                "content": 0
//                                            }
//                                        },
//                                        {
//                                            "name": "heartBeatCount",
//                                            "value": {
//                                                "type": "int",
//                                                "content": 0
//                                            }
//                                        },
//                                        {
//                                            "name": "heartBeatEventTime",
//                                            "value": {
//                                                "type": "float",
//                                                "content": 0
//                                            }
//                                        },
//                                        {
//                                            "name": "heartRate",
//                                            "value": {
//                                                "type": "int",
//                                                "content": 0
//                                            }
//                                        }
//                                    ]
//                                }
                                //push this object end
                            ]
                        },
                        {//1
                            "name": "Page4 Addt Measurement",
                            "type": "page4AddtMeasurement",
                            "section": [
                                // push this object
//                                {
//                                    "name": "page4Addt",
//                                    "type": "page4Addt",
//                                    "property": [
//                                        {
//                                            "name": "timestamp",
//                                            "value": {
//                                                "type": "int",
//                                                "content": 0
//                                            }
//                                        },
//                                        {
//                                            "name": "estTimestamp",
//                                            "value": {
//                                                "type": "int",
//                                                "content": 0
//                                            }
//                                        },
//                                        {
//                                            "name": "previousHeartBeatEventTime",
//                                            "value": {
//                                                "type": "float",
//                                                "content": 0
//                                            }
//                                        },
//                                        {
//                                            "name": "manufacturerSpecificByte",
//                                            "value": {
//                                                "type": "int",
//                                                "content": 0
//                                            }
//                                        }
//                                    ]
//                                }
                                //push this object end
                            ]
                        },
                        {//2
                            "name": "Cumulative Operating Time",
                            "type": "cumulativeOperatingTime",
                            "section": [
                                // push this object
//                                {
//                                    "name": "cor",
//                                    "type": "cor",
//                                    "property": [
//                                        {
//                                            "name": "timestamp",
//                                            "value": {
//                                                "type": "int",
//                                                "content": 0
//                                            }
//                                        },
//                                        {
//                                            "name": "estTimestamp",
//                                            "value": {
//                                                "type": "int",
//                                                "content": 0
//                                            }
//                                        },
//                                        {
//                                            "name": "cumulativeOperatingTime",
//                                            "value": {
//                                                "type": "int",
//                                                "content": 0
//                                            }
//                                        }
//                                    ]
//                                }
                                //push this object end
                            ]
                        },
                        {//3
                            "name": "RR Interval Measurement",
                            "type": "rrIntervalMeasurement",
                            "section": [
                                // push this object
//                                {
//                                    "name": "rr",
//                                    "type": "rr",
//                                    "property": [
//                                        {
//                                            "name": "timestamp",
//                                            "value": {
//                                                "type": "int",
//                                                "content": 0
//                                            }
//                                        },
//                                        {
//                                            "name": "estTimestamp",
//                                            "value": {
//                                                "type": "int",
//                                                "content": 0
//                                            }
//                                        },
//                                        {
//                                            "name": "rrInterval",
//                                            "value": {
//                                                "type": "int",
//                                                "content": 0
//                                            }
//                                        }
//                                    ]
//                                }
                                //push this object end
                            ]
                        },
                        {//4
                            "name": "Manufacturer And Serial",
                            "type": "manufacturerAndSerial",
                            "property": [
                                {//0
                                    "name": "manufacturerID",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                },
                                {//1
                                    "name": "serialNumber",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                }
                            ]
                        },
                        {//5
                            "name": "Version And Model",
                            "type": "versionAndModel",
                            "property": [
                                {//0
                                    "name": "softwareVersion",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                },
                                {//1
                                    "name": "hardwareVersion",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                }
                            ]
                        }
                    ]
                }
            };

            return {
                getBasicObject: function () {
                    return odMLdataStructure;
                },
                getDate: function (data) {
                    return data.odML.date;
                },
                getHeartRateMeasurement: function (data) {
                    return data.odML.section[0];
                },
                getPage4AddtMeasurement: function (data) {
                    return data.odML.section[1];
                },
                getCumulativeOperatingTime: function (data) {
                    return data.odML.section[2];
                },
                getRrIntervalMeasurement: function (data) {
                    return data.odML.section[3];
                },
                getManufacturerAndSerial: function (data) {
                    return data.odML.section[4];
                },
                getVersionAndModel: function (data) {
                    return data.odML.section[5];
                },
                setDate: function (data, value) {
                    var result = data;
                    result.odML.date = value;
                    return result;
                },
                setManufacturerAndSerial: function (data, measurement) {
                    var result = data;
                    result.odML.section[4].property[0].value.content = measurement.manufacturerID;
                    result.odML.section[4].property[1].value.content = measurement.serialNumber;
                    return result;
                },
                setVersionAndModel: function (data, measurement) {
                    var result = data;
                    result.odML.section[5].property[0].value.content = measurement.softwareVersion;
                    result.odML.section[5].property[1].value.content = measurement.hardwareVersion;
                    return result;
                },
                addHeartRateMeasurement: function (data, measurement) {
                    var toPush = {
                        "name": "hr",
                        "type": "hr",
                        "property": [
                            {
                                "name": "timestamp",
                                "value": {
                                    "type": "int",
                                    "content": measurement.timestamp
                                }
                            },
                            {
                                "name": "heartBeatCount",
                                "value": {
                                    "type": "int",
                                    "content": measurement.heartBeatCount
                                }
                            },
                            {
                                "name": "heartBeatEventTime",
                                "value": {
                                    "type": "float",
                                    "content": measurement.heartBeatEventTime
                                }
                            },
                            {
                                "name": "heartRate",
                                "value": {
                                    "type": "int",
                                    "content": measurement.heartRate
                                }
                            }
                        ]
                    };
                    var result = data;
                    result.odML.section[0].section.push(toPush);
                    return result;
                },
                addPage4AddtMeasurement: function (data, measurement) {
                    var toPush = {
                        "name": "page4Addt",
                        "type": "page4Addt",
                        "property": [
                            {
                                "name": "timestamp",
                                "value": {
                                    "type": "int",
                                    "content": measurement.timestamp
                                }
                            },
                            {
                                "name": "estTimestamp",
                                "value": {
                                    "type": "int",
                                    "content": measurement.estTimestamp
                                }
                            },
                            {
                                "name": "previousHeartBeatEventTime",
                                "value": {
                                    "type": "float",
                                    "content": measurement.previousHeartBeatEventTime
                                }
                            },
                            {
                                "name": "manufacturerSpecificByte",
                                "value": {
                                    "type": "int",
                                    "content": measurement.manufacturerSpecificByte
                                }
                            }
                        ]
                    };
                    var result = data;
                    result.odML.section[1].section.push(toPush);
                    return result;
                },
                addCumulativeOperatingTime: function (data, measurement) {
                    var toPush = {
                        "name": "cor",
                        "type": "cor",
                        "property": [
                            {
                                "name": "timestamp",
                                "value": {
                                    "type": "int",
                                    "content": measurement.timestamp
                                }
                            },
                            {
                                "name": "estTimestamp",
                                "value": {
                                    "type": "int",
                                    "content": measurement.estTimestamp
                                }
                            },
                            {
                                "name": "cumulativeOperatingTime",
                                "value": {
                                    "type": "int",
                                    "content": measurement.cumulativeOperatingTime
                                }
                            }
                        ]
                    };
                    var result = data;
                    result.odML.section[2].section.push(toPush);
                    return result;
                },
                addRrIntervalMeasurement: function (data, measurement) {
                    var toPush = {
                        "name": "rr",
                        "type": "rr",
                        "property": [
                            {
                                "name": "timestamp",
                                "value": {
                                    "type": "int",
                                    "content": measurement.timestamp
                                }
                            },
                            {
                                "name": "estTimestamp",
                                "value": {
                                    "type": "int",
                                    "content": measurement.estTimestamp
                                }
                            },
                            {
                                "name": "rrInterval",
                                "value": {
                                    "type": "int",
                                    "content": measurement.rrInterval
                                }
                            }
                        ]
                    };
                    var result = data;
                    result.odML.section[3].section.push(toPush);
                    return result;
                }
            };

        });

