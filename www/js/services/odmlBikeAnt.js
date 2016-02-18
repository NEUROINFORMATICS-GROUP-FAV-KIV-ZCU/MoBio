angular.module('mobio.odML')

        .factory('odmlBikeAnt', function ($http, $q) {

            var odMLdataStructure = {
                "odML": {
                    "author": "mobio_app",
                    "date": "1970-01-01T00:00:00+00:00", //ISO 8601
                    "version": 1,
                    "xmlns:gui": "http://www.g-node.org/guiml",
                    "section": [
                        {//0
                            "name": "Calculated Speed",
                            "type": "calculatedSpeed",
                            "section": [
                            ]
                        },
                        {//1
                            "name": "Calculated Accumulated Distance",
                            "type": "calculatedAccumulatedDistance",
                            "property": [
                                {//0
                                    "name": "calculatedAccumulatedDistance",
                                    "value": {
                                        "type": "float",
                                        "content": 0
                                    }
                                }
                            ]
                        },
                        {//2
                            "name": "Cumulative Revolutions",
                            "type": "cumulativeRevolutions",
                            "property": [
                                {//0
                                    "name": "cumulativeRevolutions",
                                    "value": {
                                        "type": "float",
                                        "content": 0
                                    }
                                },
                                {//1
                                    "name": "timestampOfLastEvent",
                                    "value": {
                                        "type": "float",
                                        "content": 0
                                    }
                                }
                            ]
                        },
                        {//3
                            "name": "Calculated Cadence",
                            "type": "calculatedCadence",
                            "property": [
                                {//0
                                    "name": "calculatedCadence",
                                    "value": {
                                        "type": "float",
                                        "content": 0
                                    }
                                },
                                {//1
                                    "name": "isCombinedSensor",
                                    "value": {
                                        "type": "boolean",
                                        "content": 0
                                    }
                                }
                            ]
                        },
                        {//4
                            "name": "Cumulative Operating Time",
                            "type": "cumulativeOperatingTime",
                            "property": [
                                {//0
                                    "name": "cumulativeOperatingTime",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                }
                            ]
                        },
                        {//5
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
                        {//6
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
                                },
                                {//2
                                    "name": "modelNumber",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                }
                            ]
                        },
                        {//7
                            "name": "Battery Status",
                            "type": "batteryStatus",
                            "property": [
                                {//0
                                    "name": "batteryVoltage",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                },
                                {//1
                                    "name": "batteryStatus",
                                    "value": {
                                        "type": "string",
                                        "content": ""
                                    }
                                }
                            ]
                        },
                        {//8
                            "name": "Motion And Speed",
                            "type": "motionAndSpeed",
                            "property": [
                                {//0
                                    "name": "estTimestamp",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                },
                                {//1
                                    "name": "isStopped",
                                    "value": {
                                        "type": "boolean",
                                        "content": false
                                    }
                                }
                            ]
                        },
                        {//9
                            "name": "Wheel Circumference",
                            "type": "wheelCircumference",
                            "property": [
                                {//0
                                    "name": "wheelCircumference",
                                    "value": {
                                        "type": "float",
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
                getCalculatedSpeed: function (data) {
                    return data.odML.section[0];
                },
                getCalculatedAccumulatedDistance: function (data) {
                    return data.odML.section[1];
                },
                getCumulativeRevolutions: function (data) {
                    return data.odML.section[2];
                },
                getCalculatedCadence: function (data) {
                    return data.odML.section[3];
                },
                getCumulativeOperatingTime: function (data) {
                    return data.odML.section[4];
                },
                getManufacturerAndSerial: function (data) {
                    return data.odML.section[5];
                },
                getVersionAndModel: function (data) {
                    return data.odML.section[6];
                },
                getBatteryStatus: function (data) {
                    return data.odML.section[7];
                },
                getMotionAndSpeed: function (data) {
                    return data.odML.section[8];
                },
                getWheelCircumference: function (data) {
                    return data.odML.section[9];
                },
                setDate: function (data, value) {
                    var result = data;
                    result.odML.date = value;
                    return result;
                },
                addCalculatedSpeed: function (data, measurement) {
                    var toPush = {
                        "name": "cs",
                        "type": "cs",
                        "property": [
                            {
                                "name": "estTimestamp",
                                "value": {
                                    "type": "int",
                                    "content": measurement.estTimestamp
                                }
                            },
                            {
                                "name": "calculatedSpeed",
                                "value": {
                                    "type": "float",
                                    "content": measurement.calculatedSpeed
                                }
                            }
                        ]
                    };
                    var result = data;
                    result.odML.section[0].section.push(toPush);
                    return result;
                },
                setCalculatedAccumulatedDistance: function (data, measurement) {
                    var result = data;
                    result.odML.section[1].property[0].value.content = measurement.calculatedAccumulatedDistance;
                    return result;
                },
                setCumulativeRevolutions: function (data, measurement) {
                    var result = data;
                    result.odML.section[2].property[0].value.content = measurement.cumulativeRevolutions;
                    return result;
                },
                setCalculatedCadence: function (data, measurement) {
                    var result = data;
                    result.odML.section[3].property[0].value.content = measurement.calculatedCadence;
                    result.odML.section[3].property[1].value.content = measurement.isCombinedSensor;
                    return result;
                },
                setCumulativeOperatingTime: function (data, measurement) {
                    var result = data;
                    result.odML.section[4].property[0].value.content = measurement.cumulativeOperatingTime;
                    return result;
                },
                setManufacturerAndSerial: function (data, measurement) {
                    var result = data;
                    result.odML.section[5].property[0].value.content = measurement.manufacturerID;
                    result.odML.section[5].property[1].value.content = measurement.serialNumber;
                    return result;
                },
                setVersionAndModel: function (data, measurement) {
                    var result = data;
                    result.odML.section[6].property[0].value.content = measurement.softwareVersion;
                    result.odML.section[6].property[1].value.content = measurement.hardwareVersion;
                    result.odML.section[6].property[2].value.content = measurement.modelNumber;
                    return result;
                },
                setBatteryStatus: function (data, measurement) {
                    var result = data;
                    result.odML.section[7].property[0].value.content = measurement.batteryVoltage;
                    result.odML.section[7].property[1].value.content = measurement.batteryStatus;
                    return result;
                },
                setMotionAndSpeed: function (data, measurement) {
                    var result = data;
                    result.odML.section[8].property[0].value.content = measurement.estTimestamp;
                    result.odML.section[8].property[1].value.content = measurement.isStopped;
                    return result;
                },
                setWheelCircumference: function (data, wheelCircumference) {
                    var result = data;
                    result.odML.section[9].property[0].value.content = wheelCircumference;
                    return result;
                }
            };

        });

