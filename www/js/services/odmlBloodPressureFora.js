angular.module('mobio.odML')

        .factory('odmlBloodPressureFora', function ($http, $q) {

            var odMLdataStructure = {
                "odML": {
                    "author": "mobio_app",
                    "date": "1970-01-01T00:00:00.000+0000",
                    "version": 1,
                    "xmlns:gui": "http://www.g-node.org/guiml",
                    "section": [
                        {//0
                            "name": "Blood Pressure Latest",
                            "type": "bloodPressureLatest",
                            "property": [
                                {//0
                                    "name": "date",
                                    "value": {
                                        "type": "string",
                                        "content": "" 
                                    }
                                },
                                {//1
                                    "name": "systolic",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                },
                                {//2
                                    "name": "diastolic",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                },
                                {//3
                                    "name": "mean",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                },
                                {//4
                                    "name": "heartRate",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                }
                            ]
                        },
                        {//1
                            "name": "Blood Pressure Measurements",
                            "type": "bloodPressureMeasurement",
                            "section": [
                            ]
                        },
                        {//2
                            "name": "Defice Info",
                            "type": "deviceInfo",
                            "property": [
                                {//0
                                    "name": "deviceName",
                                    "value": {
                                        "type": "string",
                                        "content": ""
                                    }
                                },
                                {//1
                                    "name": "adress",
                                    "value": {
                                        "type": "string",
                                        "content": ""
                                    }
                                },
                                {//2
                                    "name": "id",
                                    "value": {
                                        "type": "string",
                                        "content": ""
                                    }
                                },
                                {//3
                                    "name": "class",
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
                    return JSON.parse(JSON.stringify(odMLdataStructure));
                },
                getDate: function (data) {
                    return data.odML.date;
                },
                getBloodPressureLatest: function (data) {
                    return data.odML.section[0];
                },
                getBloodPressureAll: function (data) {
                    return data.odML.section[1];
                },
                getDeviceInfo: function (data) {
                    return data.odML.section[2];
                },
                getLatestHeartRate: function (data) {
                    return data.odML.section[0].property[4].value.content;
                },
                setDate: function (data, value) {
                    var result = data;
                    result.odML.date = value;
                    return result;
                },
                setBloodPressureLatest: function (data, date, measurement) {
                    var result = data;
                    result.odML.section[0].property[0].value.content = date;
                    result.odML.section[0].property[1].value.content = measurement.systolic;
                    result.odML.section[0].property[2].value.content = measurement.diastolic;
                    result.odML.section[0].property[3].value.content = measurement.mean;
                    result.odML.section[0].property[4].value.content = measurement.heartRate;
                    return result;
                },
                addBloodPressureMeasurement: function (data, date, measurement) {
                    var toPush = {
                        "name": "Blood Pressure",
                        "type": "bloodPressure",
                        "property": [
                            {//0
                                "name": "date",
                                "value": {
                                    "type": "string",
                                    "content": date 
                                }
                            },
                            {//1
                                "name": "systolic",
                                "value": {
                                    "type": "int",
                                    "content": measurement.systolic
                                }
                            },
                            {//2
                                "name": "diastolic",
                                "value": {
                                    "type": "int",
                                    "content": measurement.diastolic
                                }
                            },
                            {//3
                                "name": "mean",
                                "value": {
                                    "type": "int",
                                    "content": measurement.mean
                                }
                            },
                            {//4
                                "name": "heartRate",
                                "value": {
                                    "type": "int",
                                    "content": measurement.heartRate
                                }
                            }
                        ]
                    };
                    var result = data;
                    result.odML.section[1].section.push(toPush);
                    return result;
                },
                resetBloodPressureMeasurement: function (data) {
                    var result = data;
                    result.odML.section[1].section = [];
                    return result;
                },
                resetBloodPressureLatest: function (data) {
                    var result = data;
                    result.odML.section[0].property = [
                        {//0
                            "name": "date",
                            "value": {
                                "type": "string",
                                "content": "" 
                            }
                        },
                        {//1
                            "name": "systolic",
                            "value": {
                                "type": "int",
                                "content": 0
                            }
                        },
                        {//2
                            "name": "diastolic",
                            "value": {
                                "type": "int",
                                "content": 0
                            }
                        },
                        {//3
                            "name": "mean",
                            "value": {
                                "type": "int",
                                "content": 0
                            }
                        },
                        {//4
                            "name": "heartRate",
                            "value": {
                                "type": "int",
                                "content": 0
                            }
                        }
                    ];
                    return result;
                },
                setDeviceInfo: function (data, deviceInfo) {
                    var result = data;
                    result.odML.section[2].property[0].value.content = deviceInfo.name;
                    result.odML.section[2].property[1].value.content = deviceInfo.address;
                    result.odML.section[2].property[2].value.content = deviceInfo.id;
                    result.odML.section[2].property[3].value.content = deviceInfo.class;
                    return result;
                }
            };

        });

