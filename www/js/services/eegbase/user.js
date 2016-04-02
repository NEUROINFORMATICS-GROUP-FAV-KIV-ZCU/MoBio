angular.module('mobio.eegbase')

        .factory('userService', function ($http, $q, settingsCache) {

            return {
                login: function (username, password) {
                    var deferred = $q.defer();
                    $http.get(settingsCache.getSettings().restUrl + "/rest/user/login", {
                        headers: {
                            'Authorization': "Basic " + btoa(username + ":" + password)
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

