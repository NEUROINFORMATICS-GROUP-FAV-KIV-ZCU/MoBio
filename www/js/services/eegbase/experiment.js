angular.module('mobio.eegbase')

        .factory('experimentService', function ($http, $q, settingsCache) {

            return {
                
                getMyExperiments: function () {
                    var deferred = $q.defer();
                    $http.get(settingsCache.getSettings().restUrl + "/rest/experiments/mineMobio").then(function (response) {
                        console.log("OK getMyExperiments");
                        console.log(response);
                        deferred.resolve(response);
                    }, function (err) {
                        console.log("error getMyExperiments");
                        console.log(err);
                        deferred.resolve(err);
                    });
                    return deferred.promise;
                },
                
                uploadOdml: function () {
                    var deferred = $q.defer();
                    var events = deferred.promise;

                    var data_json = {"odML":{"author":"mobio_app","date":"2016-02-14T09:52:57.000+0100","version":1,"xmlns:gui":"http://www.g-node.org/guiml","section":[{"name":"Blood Pressure Latest","type":"bloodPressureLatest","property":[{"name":"date","value":{"type":"string","content":"2015-09-22T22:55:00+02:00"}},{"name":"systolic","value":{"type":"int","content":115}},{"name":"diastolic","value":{"type":"int","content":84}},{"name":"mean","value":{"type":"int","content":94}},{"name":"heartRate","value":{"type":"int","content":80}}]},{"name":"Blood Pressure Measurements","type":"bloodPressureMeasurement","section":[{"name":"Blood Pressure","type":"bloodPressure","property":[{"name":"date","value":{"type":"string","content":"2015-09-22T22:55:00+02:00"}},{"name":"systolic","value":{"type":"int","content":115}},{"name":"diastolic","value":{"type":"int","content":84}},{"name":"mean","value":{"type":"int","content":94}},{"name":"heartRate","value":{"type":"int","content":80}}]},{"name":"Blood Pressure","type":"bloodPressure","property":[{"name":"date","value":{"type":"string","content":"2015-09-01T09:54:00+02:00"}},{"name":"systolic","value":{"type":"int","content":131}},{"name":"diastolic","value":{"type":"int","content":86}},{"name":"mean","value":{"type":"int","content":102}},{"name":"heartRate","value":{"type":"int","content":79}}]},{"name":"Blood Pressure","type":"bloodPressure","property":[{"name":"date","value":{"type":"string","content":"2015-09-01T09:53:00+02:00"}},{"name":"systolic","value":{"type":"int","content":143}},{"name":"diastolic","value":{"type":"int","content":102}},{"name":"mean","value":{"type":"int","content":117}},{"name":"heartRate","value":{"type":"int","content":71}}]},{"name":"Blood Pressure","type":"bloodPressure","property":[{"name":"date","value":{"type":"string","content":"2015-08-23T17:15:00+02:00"}},{"name":"systolic","value":{"type":"int","content":112}},{"name":"diastolic","value":{"type":"int","content":71}},{"name":"mean","value":{"type":"int","content":86}},{"name":"heartRate","value":{"type":"int","content":49}}]},{"name":"Blood Pressure","type":"bloodPressure","property":[{"name":"date","value":{"type":"string","content":"2015-08-23T13:43:00+02:00"}},{"name":"systolic","value":{"type":"int","content":117}},{"name":"diastolic","value":{"type":"int","content":71}},{"name":"mean","value":{"type":"int","content":85}},{"name":"heartRate","value":{"type":"int","content":65}}]},{"name":"Blood Pressure","type":"bloodPressure","property":[{"name":"date","value":{"type":"string","content":"2015-08-23T13:42:00+02:00"}},{"name":"systolic","value":{"type":"int","content":121}},{"name":"diastolic","value":{"type":"int","content":70}},{"name":"mean","value":{"type":"int","content":93}},{"name":"heartRate","value":{"type":"int","content":67}}]},{"name":"Blood Pressure","type":"bloodPressure","property":[{"name":"date","value":{"type":"string","content":"2015-08-23T13:41:00+02:00"}},{"name":"systolic","value":{"type":"int","content":105}},{"name":"diastolic","value":{"type":"int","content":71}},{"name":"mean","value":{"type":"int","content":87}},{"name":"heartRate","value":{"type":"int","content":63}}]},{"name":"Blood Pressure","type":"bloodPressure","property":[{"name":"date","value":{"type":"string","content":"2015-08-23T11:30:00+02:00"}},{"name":"systolic","value":{"type":"int","content":104}},{"name":"diastolic","value":{"type":"int","content":57}},{"name":"mean","value":{"type":"int","content":80}},{"name":"heartRate","value":{"type":"int","content":55}}]},{"name":"Blood Pressure","type":"bloodPressure","property":[{"name":"date","value":{"type":"string","content":"2015-07-21T21:09:00+02:00"}},{"name":"systolic","value":{"type":"int","content":108}},{"name":"diastolic","value":{"type":"int","content":61}},{"name":"mean","value":{"type":"int","content":82}},{"name":"heartRate","value":{"type":"int","content":69}}]},{"name":"Blood Pressure","type":"bloodPressure","property":[{"name":"date","value":{"type":"string","content":"2015-07-21T20:59:00+02:00"}},{"name":"systolic","value":{"type":"int","content":115}},{"name":"diastolic","value":{"type":"int","content":77}},{"name":"mean","value":{"type":"int","content":87}},{"name":"heartRate","value":{"type":"int","content":77}}]}]},{"name":"Defice Info","type":"deviceInfo","property":[{"name":"deviceName","value":{"type":"string","content":"TAIDOC TD3129"}},{"name":"adress","value":{"type":"string","content":"8C:DE:52:21:86:94"}},{"name":"id","value":{"type":"string","content":"8C:DE:52:21:86:94"}},{"name":"class","value":{"type":"int","content":1028}}]}]}};

                    var experimentId = 20;

                    $http.post(settingsCache.getSettings().restUrl + "/rest/experiments/addOdmlMobio/" + experimentId, data_json,  {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}}).then(function (response) {
                        console.log("OK addOdmlMobio");
                        console.log(response);
                        deferred.resolve(response);
                    }, function (err) {
                        console.log("error addOdmlMobio");
                        console.log(err);
                        deferred.resolve(err);
                    });

                    return events;
                }


            };

        });

