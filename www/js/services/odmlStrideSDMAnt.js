angular.module('mobio.odML')

        .factory('odmlStrideSDMAnt', function ($http, $q) {

            var odMLdataStructure = {
                "odML": {
                    "author": "mobio_app",
                    "date": "1970-01-01T00:00:00.000+0000", 
                    "version": 1,
                    "xmlns:gui": "http://www.g-node.org/guiml",
                    "section": [
                        {//0
                            "name": "Instantaneous Speed Measurement",
                            "type": "instantaneousSpeed",
                            "section": [

                            ]
                        },
                        {//1
                            "name": "Instantaneous Cadence Measurement",
                            "type": "instantaneousCadence",
                            "section": [

                            ]
                        },
                        {//2
                            "name": "Cumulative Distance",
                            "type": "cumulativeDistance",
                            "property": [
                                {//0
                                    "name": "cumulativeDistance",
                                    "value": {
                                        "type": "float",
                                        "content": 0
                                    }
                                }
                            ]
                        },
                        {//3
                            "name": "Stride Count",
                            "type": "strideCount",
                            "property": [
                                {//0
                                    "name": "cumulativeStrides",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                }
                            ]
                        },
                        {//4
                            "name": "Computation Timestamp",
                            "type": "computationTimestamp",
                            "property": [
                                {//0
                                    "name": "timestampOfLastComputation",
                                    "value": {
                                        "type": "float",
                                        "content": 0
                                    }
                                }
                            ]
                        },
                        {//5
                            "name": "Sensor Status",
                            "type": "sensorStatus",
                            "property": [
                                {//0
                                    "name": "sensorLocation",
                                    "value": {
                                        "type": "string",
                                        "content": ""
                                    }
                                },
                                {//1
                                    "name": "batteryStatus",
                                    "value": {
                                        "type": "string",
                                        "content": ""
                                    }
                                },
                                {//2
                                    "name": "sensorHealth",
                                    "value": {
                                        "type": "string",
                                        "content": ""
                                    }
                                },
                                {//3
                                    "name": "useState",
                                    "value": {
                                        "type": "string",
                                        "content": ""
                                    }
                                }
                            ]
                        },
                        {//6
                            "name": "Calories",
                            "type": "calorie",
                            "property": [
                                {//0
                                    "name": "cumulativeCalories",
                                    "value": {
                                        "type": "int",
                                        "content": ""
                                    }
                                }
                            ]
                        },
                        {//7
                            "name": "Manufacturer Identification",
                            "type": "manufacturerIdentification",
                            "property": [
                                {//0
                                    "name": "hardwareRevision",
                                    "value": {
                                        "type": "int",
                                        "content": ""
                                    }
                                },
                                {//1
                                    "name": "manufacturerID",
                                    "value": {
                                        "type": "int",
                                        "content": ""
                                    }
                                },
                                {//2
                                    "name": "modelNumber",
                                    "value": {
                                        "type": "int",
                                        "content": ""
                                    }
                                }
                            ]
                        },
                        {//8
                            "name": "Product Information",
                            "type": "productInformation",
                            "property": [
                                {//0
                                    "name": "mainSoftwareRevision",
                                    "value": {
                                        "type": "int",
                                        "content": ""
                                    }
                                },
                                {//1
                                    "name": "supplementalSoftwareRevision",
                                    "value": {
                                        "type": "int",
                                        "content": ""
                                    }
                                },
                                {//2
                                    "name": "serialNumber",
                                    "value": {
                                        "type": "int",
                                        "content": ""
                                    }
                                }
                            ]
                        },
                        {//9
                            "name": "Manufacturer Specific Data",
                            "type": "manufacturerSpecificData",
                            "property": [
                                {//0
                                    "name": "hexString",
                                    "value": {
                                        "type": "string",
                                        "content": ""
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
                getInstantaneousSpeedMeasurement: function (data) {
                    return data.odML.section[0];
                },
                getInstantaneousCadenceMeasurement: function (data) {
                    return data.odML.section[1];
                },
                getCumulativeDistance: function (data) {
                    return data.odML.section[2];
                },
                getStrideCount: function (data) {
                    return data.odML.section[3];
                },
                getComputationTimestamp: function (data) {
                    return data.odML.section[4];
                },
                getSensorStatus: function (data) {
                    return data.odML.section[5];
                },
                getCalorie: function (data) {
                    return data.odML.section[6];
                },
                getManufacturerIdentification: function (data) {
                    return data.odML.section[7];
                },
                getProductInformation: function (data) {
                    return data.odML.section[8];
                },
                getManufacturerSpecificData: function (data) {
                    return data.odML.section[9];
                },
                
                setDate: function (data, value) {
                    var result = data;
                    result.odML.date = value;
                    return result;
                },
                setCumulativeDistance: function (data, measurement) {
                    var result = data;
                    result.odML.section[2].property[0].value.content = measurement.cumulativeDistance;
                    return result;
                },
                setStrideCount: function (data, measurement) {
                    var result = data;
                    result.odML.section[3].property[0].value.content = measurement.cumulativeStrides;
                    return result;
                },
                setComputationTimestamp: function (data, measurement) {
                    var result = data;
                    result.odML.section[4].property[0].value.content = measurement.timestampOfLastComputation;
                    return result;
                },
                setSensorStatus: function (data, measurement) {
                    var result = data;
                    result.odML.section[5].property[0].value.content = measurement.sensorLocation;
                    result.odML.section[5].property[1].value.content = measurement.batteryStatus;
                    result.odML.section[5].property[2].value.content = measurement.sensorHealth;
                    result.odML.section[5].property[3].value.content = measurement.useState;
                    return result;
                },
                setCalorie: function (data, measurement) {
                    var result = data;
                    result.odML.section[6].property[0].value.content = measurement.cumulativeCalories;
                    return result;
                },
                setManufacturerIdentification: function (data, measurement) {
                    var result = data;
                    result.odML.section[7].property[0].value.content = measurement.hardwareRevision;
                    result.odML.section[7].property[1].value.content = measurement.manufacturerID;
                    result.odML.section[7].property[2].value.content = measurement.modelNumber;
                    return result;
                },
                setProductInformation: function (data, measurement) {
                    var result = data;
                    result.odML.section[8].property[0].value.content = measurement.mainSoftwareRevision;
                    result.odML.section[8].property[1].value.content = measurement.supplementalSoftwareRevision;
                    result.odML.section[8].property[2].value.content = measurement.serialNumber;
                    return result;
                },
                setManufacturerSpecificData: function (data, measurement) {
                    var result = data;
                    result.odML.section[9].property[0].value.content = measurement.hexString;
                    return result;
                },
                addInstantaneousSpeedMeasurement: function (data, measurement) {
                    var toPush = {
                        "name": "is",
                        "type": "is",
                        "property": [
                            {
                                "name": "estTimestamp",
                                "value": {
                                    "type": "int",
                                    "content": measurement.estTimestamp
                                }
                            },
                            {
                                "name": "instantaneousSpeed",
                                "value": {
                                    "type": "float",
                                    "content": measurement.instantaneousSpeed
                                }
                            }
                        ]
                    };
                    var result = data;
                    result.odML.section[0].section.push(toPush);
                    return result;
                },
                addInstantaneousCadenceMeasurement: function (data, measurement) {
                    var toPush = {
                        "name": "ic",
                        "type": "ic",
                        "property": [
                            {
                                "name": "estTimestamp",
                                "value": {
                                    "type": "int",
                                    "content": measurement.estTimestamp
                                }
                            },
                            {
                                "name": "instantaneousCadence",
                                "value": {
                                    "type": "float",
                                    "content": measurement.instantaneousCadence
                                }
                            }
                        ]
                    };
                    var result = data;
                    result.odML.section[1].section.push(toPush);
                    return result;
                }
            };

        });

