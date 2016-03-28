angular.module('mobio.cache')

        .factory('localCache', function () {

            return {
                cacheAvailable: function () {
                    return (typeof (Storage) === 'undefined' ? false : true)
                },
                initialize: function () {
                    if (this.cacheAvailable()) { // local storage is supported

                        var cachesList = ["profileCache", "settingsCache", "experimentCache"];
                        for (var i = 0; i < cachesList.length; i++) {
                            if (window.localStorage.getItem(cachesList[i]) == null) { // initialize cache storage
                                window.localStorage.setItem(cachesList[i], JSON.stringify({}));
                                window.localStorage.setItem("settingsCache", JSON.stringify({restUrl: "http://192.168.0.6:8080"}));
                            }
                        }                                                                                             
                        return true;
                    }
                    return false;
                }      
            };

        });
