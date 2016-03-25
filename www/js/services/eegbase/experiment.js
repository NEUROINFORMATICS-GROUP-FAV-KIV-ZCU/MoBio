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
                
                uploadOdml: function (odML, experimentId) {
                    var deferred = $q.defer();
                    var events = deferred.promise;

                    $http.post(settingsCache.getSettings().restUrl + "/rest/experiments/addOdmlMobio/" + experimentId, odML,  {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}}).then(function (response) {
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

