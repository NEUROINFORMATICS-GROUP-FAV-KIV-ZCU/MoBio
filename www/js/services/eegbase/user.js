angular.module('mobio.eegbase')

        .factory('userService', function ($http, $q, $timeout, settingsCache) {

            return {
                login: function (username, password) {
                    var deferred = $q.defer();
                    $http.get(settingsCache.getSettings().restUrl + "/rest/user/login", {
                        timeout: deferred.promise,
                        headers: {                            
                            'Authorization': "Basic " + btoa(username + ":" + password)
                        }
                    }).then(function (response) {
                        deferred.resolve(response);
                    }, function (err) {
                        deferred.reject(err);
                    });

                    $timeout(function () {
                        deferred.resolve('timeout');
                    }, 5000);

                    return deferred.promise;
                }
            };

        });

