angular.module('mobio.cache')

        .factory('experimentCache', function () {

            return {
                cacheAvailable: function () {
                    return (typeof (Storage) === 'undefined' ? false : true);
                },
                getExperiments: function () {
                    if (!this.cacheAvailable()) {
                        return false;
                    }
                    return JSON.parse(window.localStorage.getItem("experimentCache"));
                },                
                getExperimentById: function (id) {
                    var experiments = this.getExperiments().experiments;
                    
                    for(var i = 0; i < experiments.length; i++) {
                        if(experiments[i].experimentId == id) {
                            return experiments[i];
                        }
                    }
                    
                    return null;
                }, 
                getSelectedExperiment: function () {
                    var experimentCache = this.getExperiments();
                    if (typeof experimentCache.selectedExperiment == 'undefined') {
                        return false;
                    }
                    return experimentCache.selectedExperiment;
                },
                setSelectedExperiment: function (selectedExperiment) {
                    if (!this.cacheAvailable()) {
                        return false;
                    }
                    var experimentCache = this.getExperiments();

                    experimentCache.selectedExperiment = selectedExperiment;
                    window.localStorage.setItem("experimentCache", JSON.stringify(experimentCache));
                    return true;
                },
                setExperiments: function (experiments) {
                    if (!this.cacheAvailable()) {
                        return false;
                    }
                    var experimentCache = this.getExperiments();

                    experimentCache.experiments = experiments;
                    window.localStorage.setItem("experimentCache", JSON.stringify(experimentCache));
                    return true;
                }
            };
        });