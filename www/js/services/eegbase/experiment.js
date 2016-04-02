angular.module('mobio.eegbase')

        .factory('experimentService', function ($http, $q, settingsCache) {

            return {
                getMyExperiments: function () {
                    var settings = settingsCache.getSettings();
                    var deferred = $q.defer();
                    $http.get(settings.restUrl + "/rest/experiments/mine", {
                        headers: {
                            'Authorization': "Basic " + btoa(settings.username + ":" + settings.password)
                        }
                    }).then(function (response) {
                        deferred.resolve(response);
                    }, function (err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },
                uploadOdml: function (odML, experimentId) {
                    var settings = settingsCache.getSettings();
                    var deferred = $q.defer();
                    $http.post(settings.restUrl + "/rest/experiments/addOdmlMobio/" + experimentId, odML, {
                        headers: {
                            'Authorization': "Basic " + btoa(settings.username + ":" + settings.password),
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        deferred.resolve(response);
                    }, function (err) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                }


            };

        });

