angular.module('mobio.cache')

        .factory('settingsCache', function () {

            return {
                cacheAvailable: function () {
                    return (typeof (Storage) === 'undefined' ? false : true);
                },
                getSettings: function () {
                    if (!this.cacheAvailable()) {
                        return false;
                    }
                    
                    if(!JSON.parse(window.localStorage.getItem("settingsCache"))) {
                        window.localStorage.setItem("settingsCache", JSON.stringify({}));
                    }
                    
                    return JSON.parse(window.localStorage.getItem("settingsCache"));
                },                
                updateSettings: function (name, value) {
                    if (!this.cacheAvailable()) {
                        return false;
                    }
                    var settingsCache = this.getSettings();
                    
                    if (!settingsCache) {
                        settingsCache = {};
                    }
                    
                    settingsCache[name] = value;
                    
                    window.localStorage.setItem("settingsCache", JSON.stringify(settingsCache));
                    return settingsCache;
                }
            };
        });