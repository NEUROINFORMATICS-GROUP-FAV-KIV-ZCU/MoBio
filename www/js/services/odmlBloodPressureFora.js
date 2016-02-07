angular.module('mobio.odML')

        .factory('odmlBloodPressureFora', function ($http, $q) {

            var dataStructure = {
                "metadata": {
                    "odML": {
                        "author": "mobio_app",
                        "date": "1970-01-01T00:00:00+00:00", //ISO 8601
                        "version": 1,
                        "xmlns:gui": "http://www.g-node.org/guiml",
                        "section": [
                            {
                                "name": "blood_pressure",
                                "type": "blood_pressure",
                                "property": [
                                    {
                                        "name": "systolic",
                                        "value": {
                                            "type": "int",
                                            "content": 0
                                        }
                                    },
                                    {
                                        "name": "diastolic",
                                        "value": {
                                            "type": "int",
                                            "content": 0
                                        }
                                    },
                                    {
                                        "name": "mean",
                                        "value": {
                                            "type": "int",
                                            "content": 0
                                        }
                                    },
                                    {
                                        "name": "heart_rate",
                                        "value": {
                                            "type": "int",
                                            "content": 0
                                        }
                                    }
                                ]
                            },
                            {
                                "name": "device_info",
                                "type": "device_info",
                                "property": [
                                    {
                                        "name": "name",
                                        "value": {
                                            "type": "string",
                                            "content": "FORA P30 Plus"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            };

            return {
                getBasicObject: function () {
                    return dataStructure;
                },
                getDate: function (data) {
                    return data.metadata.odML.date;
                },
                getSystolic: function (data) {
                    return data.metadata.odML.section[0].property[0].value.content;
                },
                getDiastolic: function (data) {
                    return data.metadata.odML.section[0].property[1].value.content;
                },
                getMean: function (data) {
                    return data.metadata.odML.section[0].property[2].value.content;
                },
                getHeartRate: function (data) {
                    return data.metadata.odML.section[0].property[3].value.content;
                },
                setDate: function (data, value) {
                    var result = data;
                    result.metadata.odML.date = value;
                    return result;
                },
                setSystolic: function (data, value) {
                    var result = data;
                    result.metadata.odML.section[0].property[0].value.content = value;
                    return result;
                },
                setDiastolic: function (data, value) {
                    var result = data;
                    result.metadata.odML.section[0].property[1].value.content = value;
                    return result;
                },
                setMean: function (data, value) {
                    var result = data;
                    result.metadata.odML.section[0].property[2].value.content = value;
                    return result;
                },
                setHeartRate: function (data, value) {
                    var result = data;
                    result.metadata.odML.section[0].property[3].value.content = value;
                    return result;
                }
            };

        });

