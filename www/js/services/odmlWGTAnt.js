angular.module('mobio.odML')

        .factory('odmlWGTAnt', function ($http, $q) {

            var odMLdataStructure = {
                "odML": {
                    "author": "mobio_app",
                    "date": "1970-01-01T00:00:00+00:00", //ISO 8601
                    "version": 1,
                    "xmlns:gui": "http://www.g-node.org/guiml",
                    "section": [
                        {//0
                            "name": "Body Weight",
                            "type": "bodyWeightBroadcast",
                            "property": [
                                {//0
                                    "name": "timestamp",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                },
                                {//1
                                    "name": "bodyWeight",
                                    "value": {
                                        "type": "float",
                                        "content": 0
                                    }
                                },
                                {//2
                                    "name": "bodyWeightStatus",
                                    "value": {
                                        "type": "string",
                                        "content": ""
                                    }
                                }
                            ]
                        },
                        {//1
                            "name": "Weight Basic Measurement",
                            "type": "basicMeasurement",
                            "property": [
                                {//0
                                    "name": "timestamp",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                },
                                {//1
                                    "name": "status",
                                    "value": {
                                        "type": "string",
                                        "content": ""
                                    }
                                },
                                {//2
                                    "name": "bodyWeight",
                                    "value": {
                                        "type": "float",
                                        "content": 0
                                    }
                                }
                            ]
                        },
                        {//2
                            "name": "Weight Advanced Measurement",
                            "type": "advancedMeasurement",
                            "property": [
                                {//0
                                    "name": "timestamp",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                },
                                {//1
                                    "name": "status",
                                    "value": {
                                        "type": "string",
                                        "content": ""
                                    }
                                },
                                {//2
                                    "name": "bodyWeight",
                                    "value": {
                                        "type": "float",
                                        "content": 0
                                    }
                                },
                                {//3
                                    "name": "hydrationPercentage",
                                    "value": {
                                        "type": "float",
                                        "content": 0
                                    }
                                },
                                {//4
                                    "name": "bodyFatPercentage",
                                    "value": {
                                        "type": "float",
                                        "content": 0
                                    }
                                },
                                {//5
                                    "name": "muscleMass",
                                    "value": {
                                        "type": "float",
                                        "content": 0
                                    }
                                },
                                {//6
                                    "name": "boneMass",
                                    "value": {
                                        "type": "float",
                                        "content": 0
                                    }
                                },
                                {//7
                                    "name": "activeMetabolicRate",
                                    "value": {
                                        "type": "float",
                                        "content": 0
                                    }
                                },
                                {//8
                                    "name": "basalMetabolicRate",
                                    "value": {
                                        "type": "float",
                                        "content": 0
                                    }
                                }
                            ]
                        },
                        {//3
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
                        {//4
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
                        {//5
                            "name": "UserProfile",
                            "type": "userProfile",
                            "property": [
                                {//0
                                    "name": "age",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                },
                                {//1
                                    "name": "height",
                                    "value": {
                                        "type": "int",
                                        "content": 0
                                    }
                                },
                                {//2
                                    "name": "gender",
                                    "value": {
                                        "type": "string",
                                        "content": "MALE"
                                    }
                                },
                                {//3
                                    "name": "lifetimeAthlete",
                                    "value": {
                                        "type": "boolean",
                                        "content": false
                                    }
                                },
                                {//4
                                    "name": "activityLevel",
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
                getBodyWeightBroadcast: function (data) {
                    return data.odML.section[0];
                },
                getBasicMeasurement: function (data) {
                    return data.odML.section[1];
                },
                getAdvancedMeasurement: function (data) {
                    return data.odML.section[2];
                },
                getManufacturerIdentification: function (data) {
                    return data.odML.section[3];
                },
                getProductInformation: function (data) {
                    return data.odML.section[4];
                },
                getUserProfile: function (data) {
                    return data.odML.section[5];
                },
                
                setDate: function (data, value) {
                    var result = data;
                    result.odML.date = value;
                    return result;
                },
                setBodyWeightBroadcast: function (data, measurement) {
                    var result = data;
                    result.odML.section[0].property[0].value.content = measurement.timestamp;
                    result.odML.section[0].property[1].value.content = measurement.bodyWeight;
                    result.odML.section[0].property[2].value.content = measurement.bodyWeightStatus;
                    return result;
                },
                setBasicMeasurement: function (data, measurement) {
                    var result = data;
                    result.odML.section[1].property[0].value.content = measurement.timestamp;
                    result.odML.section[1].property[1].value.content = measurement.status;
                    result.odML.section[1].property[2].value.content = measurement.bodyWeight;
                    return result;
                },
                setAdvancedMeasurement: function (data, measurement) {
                    var result = data;
                    result.odML.section[2].property[0].value.content = measurement.timestamp;
                    result.odML.section[2].property[1].value.content = measurement.status;
                    result.odML.section[2].property[2].value.content = measurement.bodyWeight;
                    result.odML.section[2].property[3].value.content = measurement.hydrationPercentage;
                    result.odML.section[2].property[4].value.content = measurement.bodyFatPercentage;
                    result.odML.section[2].property[5].value.content = measurement.muscleMass;
                    result.odML.section[2].property[6].value.content = measurement.boneMass;
                    result.odML.section[2].property[7].value.content = measurement.activeMetabolicRate;
                    result.odML.section[2].property[8].value.content = measurement.basalMetabolicRate;
                    return result;
                },
                setManufacturerIdentification: function (data, measurement) {
                    var result = data;
                    result.odML.section[3].property[0].value.content = measurement.hardwareRevision;
                    result.odML.section[3].property[1].value.content = measurement.manufacturerID;
                    result.odML.section[3].property[2].value.content = measurement.modelNumber;
                    return result;
                },
                setProductInformation: function (data, measurement) {
                    var result = data;
                    result.odML.section[4].property[0].value.content = measurement.mainSoftwareRevision;
                    result.odML.section[4].property[1].value.content = measurement.supplementalSoftwareRevision;
                    result.odML.section[4].property[2].value.content = measurement.serialNumber;
                    return result;
                },
                setUserProfile: function (data, userProfile) {
                    var result = data;
                    result.odML.section[5].property[0].value.content = userProfile.age;
                    result.odML.section[5].property[1].value.content = userProfile.height;
                    result.odML.section[5].property[2].value.content = userProfile.gender == 1 ? "MALE" : "FEMALE";
                    result.odML.section[5].property[3].value.content = userProfile.lifetimeAthlete;
                    result.odML.section[5].property[4].value.content = userProfile.activityLevel;
                    return result;
                }
            };

        });

